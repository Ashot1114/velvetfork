import { useState } from "react";
import PageHero from "@/components/PageHero";
import galleryHero from "@/assets/gallery-hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/contexts/AuthModalContext";

const ContactPage = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error(t("auth.loginRequired"));
      openAuthModal();
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    try {
      const res = await supabase.functions.invoke("submit-message", {
        body: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          message: formData.get("message") as string,
        },
      });
      setLoading(false);
      if (res.error || res.data?.error) {
        toast.error(res.data?.error || "Failed to send message. Please try again.");
        return;
      }
    } catch {
      setLoading(false);
      toast.error("Failed to send message. Please try again.");
      return;
    }

    setSent(true);
    toast.success(t("contact.sent"));
  };

  return (
    <div className="min-h-screen">
      <PageHero title={t("contact.getIn")} titleAccent={t("contact.touch")} subtitle={t("contact.subtitle")} image={galleryHero} />

      <section className="max-w-[1200px] mx-auto py-20 px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-20">
          <div>
            {[
              { icon: "📍", label: t("contact.address"), value: "42 Gansevoort Street\nNew York, NY 10014" },
              { icon: "📞", label: t("contact.phone"), value: "+1 (212) 555-0178" },
              { icon: "✉️", label: t("contact.email"), value: "hello@velvetfork.com" },
            ].map((d) => (
              <div key={d.label} className="flex items-start gap-5 mb-8">
                <span className="text-xl text-primary flex-shrink-0 mt-0.5">{d.icon}</span>
                <div>
                  <strong className="block text-[0.72rem] tracking-[0.18em] uppercase text-primary mb-1 font-medium">{d.label}</strong>
                  <span className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{d.value}</span>
                </div>
              </div>
            ))}
            <div className="mt-10 bg-muted border border-border p-7">
              <h4 className="text-[0.72rem] tracking-[0.2em] uppercase text-primary mb-4 font-medium">{t("contact.hours")}</h4>
              {[
                ["Mon — Thu", "5:30 PM – 10:00 PM"],
                ["Fri — Sat", "5:00 PM – 11:00 PM"],
                ["Sunday", "5:00 PM – 9:30 PM"],
                ["Brunch (Sat & Sun)", "11:00 AM – 2:00 PM"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between text-sm py-1.5 border-b border-border last:border-none text-muted-foreground">
                  <span>{day}</span>
                  <span className="text-foreground">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted border border-border p-12">
            <h3 className="font-serif text-2xl text-foreground mb-6">{t("contact.sendMessage")}</h3>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("contact.name")}</label>
                  <input name="name" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground w-full" placeholder={t("contact.yourName")} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("contact.email")}</label>
                  <input name="email" type="email" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors placeholder:text-muted-foreground w-full" placeholder={t("contact.yourEmail")} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] tracking-[0.2em] uppercase text-primary">{t("contact.message")}</label>
                  <textarea name="message" required className="bg-accent border border-primary/20 text-foreground px-4 py-3 font-sans text-sm font-light outline-none focus:border-primary transition-colors resize-y min-h-[120px] placeholder:text-muted-foreground w-full" placeholder={t("contact.yourMessage")} />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 font-sans text-[0.78rem] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-primary text-primary-foreground transition-all hover:bg-primary-light disabled:opacity-50"
                  style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                >
                  {loading ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="text-4xl mb-4">✓</div>
                <h4 className="font-serif text-xl text-foreground mb-2">{t("contact.sent")}</h4>
                <p className="text-muted-foreground text-sm">{t("contact.sentDesc")}</p>
              </div>
            )}
          </div>
        </div>

        <div className="h-[400px] border border-border overflow-hidden relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.4!2d-74.0077!3d40.7394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzIxLjgiTiA3NMKwMDAnMjcuNyJX!5e0!3m2!1sen!2sus!4v1"
            className="w-full h-full border-none grayscale brightness-[0.6] contrast-125"
            loading="lazy"
            title="Map"
          />
          <div className="absolute bottom-6 left-6 bg-background/[0.92] border border-primary/20 px-5 py-3 text-sm text-foreground">
            <strong className="text-primary block mb-0.5">Velvet Fork</strong>
            42 Gansevoort St, NYC
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
