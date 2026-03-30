import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_TIMES = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, phone, email, guests, date, time, requests } = body;

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: "Name is required and must be under 100 characters." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim()) || email.trim().length > 255) {
      return new Response(JSON.stringify({ error: "A valid email address is required." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate phone
    const phoneRegex = /^[\d\s\-()+]{7,30}$/;
    if (!phone || typeof phone !== "string" || !phoneRegex.test(phone.trim())) {
      return new Response(JSON.stringify({ error: "A valid phone number is required." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate guests
    const guestsNum = Number(guests);
    if (!Number.isInteger(guestsNum) || guestsNum < 1 || guestsNum > 8) {
      return new Response(JSON.stringify({ error: "Guests must be between 1 and 8." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate date (YYYY-MM-DD format)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date || typeof date !== "string" || !dateRegex.test(date)) {
      return new Response(JSON.stringify({ error: "A valid date is required." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate time
    if (!time || !VALID_TIMES.includes(time)) {
      return new Response(JSON.stringify({ error: "A valid time slot is required." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Validate requests (optional)
    const cleanRequests = requests && typeof requests === "string" ? requests.trim().slice(0, 500) : "";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.from("reservations").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      guests: guestsNum,
      date,
      time,
      requests: cleanRequests,
    });

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to submit reservation." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
