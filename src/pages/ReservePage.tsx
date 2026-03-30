import { useState } from "react";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/hero-bg.jpg";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const ReservePage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    try {
      const res = await supabase.functions.invoke("submit-reservation", {
        body: {
          name: formData.get("name") as string,
          phone: formData.get("phone") as string,
          email: formData.get("email") as string,
          guests: parseInt(formData.get("guests") as string),
          date: formData.get("date") as string,
          time: formData.get("time") as string,
          requests: (formData.get("requests") as string) || "",
        },
      });
      setLoading(false);
      if (res.error || res.data?.error) {
        toast.error(res.data?.error || "Failed to submit reservation. Please try again.");
        return;
      }
    } catch {
      setLoading(false);
      toast.error("Failed to submit reservation. Please try again.");
      return;
    }

    if (error) {
      toast.error("Failed to submit reservation. Please try again.");
      return;
    }
    setSubmitted(true);
    toast.success(t("reserve.received"));
  };

  return (
    <div className="min-h-screen">
      <PageHero title={t("reserve.reserveA")} titleAccent={t("reserve.table")} subtitle={t("reserve.subtitle")} image={heroBg} />

      <section className="max-w-[900px] mx-auto py-20 px-[5%]">
        <div className="text-center mb-16">
          <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-4">{t("reserve.reservations")}</p>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-light text-foreground mb-4">{t("reserve.bookEvening")}</h2>
          <p className="text-muted-foreground text-sm">{t("reserve.bookDesc")}</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-muted border border-primary/20 p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("reserve.fullName")}</label>
                <input name="name" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground" placeholder={t("contact.yourName")} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("reserve.phone")}</label>
                <input name="phone" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("reserve.email")}</label>
                <input name="email" type="email" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground" placeholder={t("contact.yourEmail")} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("reserve.partySize")}</label>
                <select name="guests" className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? t("reserve.guest") : t("reserve.guests")}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("reserve.date")}</label>
                <input name="date" type="date" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("reserve.time")}</label>
                <select name="time" className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors">
                  {["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("reserve.specialRequests")}</label>
              <textarea name="requests" className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors resize-y min-h-[100px] placeholder:text-muted-foreground" placeholder={t("reserve.specialPlaceholder")} />
            </div>
            <div className="text-center mt-10">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light disabled:opacity-50"
                style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
              >
                {loading ? t("reserve.submitting") : t("reserve.submit")}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-16 px-8">
            <div className="text-5xl mb-6 animate-fade-up">✓</div>
            <h3 className="font-serif text-3xl font-normal text-foreground mb-4">{t("reserve.received")}</h3>
            <p className="text-muted-foreground">{t("reserve.receivedDesc")}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReservePage;
