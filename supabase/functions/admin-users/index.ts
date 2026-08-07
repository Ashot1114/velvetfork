import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ROLES = ["admin", "manager", "staff", "editor", "user"] as const;

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

      if (action === "setRole") {
        const role = body.role;
        if (role !== null && !ROLES.includes(role)) return json({ error: "Unknown role." }, 400);
        if (targetId === callerId && role !== "admin") {
          return json({ error: "You cannot change your own admin role." }, 400);
        }
        const { error: delErr } = await admin.from("user_roles").delete().eq("user_id", targetId);
        if (delErr) return json({ error: "Failed to update role." }, 500);
        if (role) {
          const { error } = await admin.from("user_roles").insert({ user_id: targetId, role });
          if (error) return json({ error: "Failed to update role." }, 500);
        }
      } else if (action === "setBlocked") {
        const blocked = body.blocked === true;
        if (targetId === callerId) {
          return json({ error: "You cannot block your own account." }, 400);
        }
        const { error } = await admin.auth.admin.updateUserById(targetId, {
          ban_duration: blocked ? "876000h" : "none",
        });
        if (error) return json({ error: "Failed to update block status." }, 500);
      } else {
        return json({ error: "Unknown action." }, 400);
      }
    }

    const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listErr) return json({ error: "Failed to load users." }, 500);

    const { data: roles } = await admin.from("user_roles").select("user_id, role");
    const roleMap = new Map((roles ?? []).map((r) => [r.user_id, r.role as string]));

    const users = list.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      name: (u.user_metadata?.full_name ?? u.user_metadata?.name ?? "") as string,
      phone: (u.phone ?? u.user_metadata?.phone ?? "") as string,
      provider: (u.app_metadata?.provider ?? "email") as string,
      email_confirmed_at: u.email_confirmed_at ?? null,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at ?? null,
      role: roleMap.get(u.id) ?? null,
      is_admin: roleMap.get(u.id) === "admin",
      blocked: Boolean(
        (u as unknown as { banned_until?: string | null }).banned_until &&
          new Date((u as unknown as { banned_until: string }).banned_until) > new Date(),
      ),
    })).sort((a, b) => Number(b.is_admin) - Number(a.is_admin) || a.email.localeCompare(b.email));

    return json({ users, callerId });
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
});
