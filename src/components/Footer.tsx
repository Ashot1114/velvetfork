import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const navItems: [string, string][] = [
    [t("nav.home"), "/"],
    [t("nav.menu"), "/menu"],
    [t("nav.about"), "/about"],
    [t("nav.gallery"), "/gallery"],
    [t("nav.contact"), "/contact"],
  ];

  return (
    <footer className="bg-secondary border-t border-border px-[5%] pt-20 pb-8 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1300px] mx-auto mb-16">
        <div>
          <Link to="/" className="font-serif text-[1.6rem] block mb-5 text-foreground">
            Velvet <span className="text-primary">Fork</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t("footer.desc")}</p>
          <div className="flex gap-4">
            {["IG", "FB", "TW"].map((s) => (
              <span key={s} className="w-[38px] h-[38px] border border-border flex items-center justify-center text-muted-foreground text-xs hover:border-primary hover:text-primary transition-colors cursor-pointer">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-6 font-medium">{t("footer.navigation")}</h4>
          <ul className="flex flex-col gap-3">
            {navItems.map(([label, to]) => (
              <li key={to}><Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-6 font-medium">{t("footer.hours")}</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>Mon — Thu: 5:30 PM – 10 PM</li>
            <li>Fri — Sat: 5:00 PM – 11 PM</li>
            <li>Sunday: 5:00 PM – 9:30 PM</li>
            <li className="text-primary mt-2">{t("footer.brunch")}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-6 font-medium">{t("footer.contact")}</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>42 Gansevoort Street</li>
            <li>New York, NY 10014</li>
            <li>+1 (212) 555-0178</li>
            <li>hello@velvetfork.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border pt-6 max-w-[1300px] mx-auto flex items-center justify-between flex-wrap gap-4">
        <span className="text-xs text-muted-foreground">{t("footer.rights")}</span>
        <span className="text-xs text-muted-foreground">{t("footer.designed")}</span>
      </div>
    </footer>
  );
};

export default Footer;
