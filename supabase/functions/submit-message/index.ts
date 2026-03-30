import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: "Name is required and must be under 100 characters." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim()) || email.trim().length > 255) {
      return new Response(JSON.stringify({ error: "A valid email address is required." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate message
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.trim().length > 2000) {
      return new Response(JSON.stringify({ error: "Message is required and must be under 2000 characters." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("messages").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to send message." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
