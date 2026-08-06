import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    if (!token) return json({ error: "Unauthorized" }, 401);

    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);
    const callerId = userData.user.id;

    const { data: callerRole } = await admin
      .from("user_roles").select("role").eq("user_id", callerId).eq("role", "admin").maybeSingle();
    if (!callerRole) return json({ error: "Forbidden" }, 403);

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const action = body.action ?? "list";

    if (action !== "list") {
      const targetId = body.userId;
      if (!targetId || typeof targetId !== "string") return json({ error: "userId is required." }, 400);

      if (action === "grant") {
        const { error } = await admin.from("user_roles").insert({ user_id: targetId, role: "admin" });
        if (error && !`${error.message}`.includes("duplicate")) return json({ error: "Failed to grant admin." }, 500);
      } else if (action === "revoke") {
        if (targetId === callerId) return json({ error: "You cannot remove your own admin role." }, 400);
        const { error } = await admin.from("user_roles").delete().eq("user_id", targetId).eq("role", "admin");
        if (error) return json({ error: "Failed to revoke admin." }, 500);
      } else {
        return json({ error: "Unknown action." }, 400);
      }
    }

    const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listErr) return json({ error: "Failed to load users." }, 500);

    const { data: roles } = await admin.from("user_roles").select("user_id, role").eq("role", "admin");
    const adminIds = new Set((roles ?? []).map((r) => r.user_id));

    const users = list.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      is_admin: adminIds.has(u.id),
    })).sort((a, b) => Number(b.is_admin) - Number(a.is_admin) || a.email.localeCompare(b.email));

    return json({ users, callerId });
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
});
