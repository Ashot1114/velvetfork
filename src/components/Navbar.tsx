import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/velvetfork-logo.png";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useLanguage, languageFullNames, type Language } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const navKeys = [
  { to: "/", key: "nav.home" },
  { to: "/menu", key: "nav.menu" },
  { to: "/about", key: "nav.about" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/contact", key: "nav.contact" },
];

const languages: Language[] = ["en", "ru", "hy", "fr", "zh"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center px-[5%] transition-all duration-400 ${
          scrolled
            ? "bg-background/[0.92] backdrop-blur-[18px] border-b border-border"
            : ""
        }`}
      >
        <Link to="/" className="mr-auto">
          <img src={logo} alt="Velvet Fork" className="h-12 w-auto" />
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          {navKeys.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs tracking-[0.18em] uppercase transition-colors relative group ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {t(link.key)}
              <span
                className={`absolute bottom-[-3px] left-0 right-0 h-px bg-primary transition-transform duration-300 origin-right ${
                  location.pathname === link.to
                    ? "scale-x-100 origin-left"
                    : "scale-x-0 group-hover:scale-x-100 group-hover:origin-left"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 ml-6">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-foreground/70 hover:text-primary transition-colors p-2"
            >
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-card border border-border py-1 min-w-[140px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      language === lang ? "text-primary bg-primary/10" : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {languageFullNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-foreground/70 hover:text-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <Link
          to="/reserve"
          className="hidden md:inline-flex ml-4 text-[0.72rem] tracking-[0.18em] uppercase px-5 py-2.5 border border-primary text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          {t("nav.reserve")}
        </Link>

        <button
          className="flex md:hidden flex-col gap-[5px] p-1 ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[999] bg-background/[0.92] backdrop-blur-[20px] flex flex-col items-center justify-center gap-8 transition-transform duration-400 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navKeys.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="font-serif text-[2.2rem] font-light text-foreground hover:text-primary transition-colors"
          >
            {t(link.key)}
          </Link>
        ))}
        <Link
          to="/reserve"
          className="font-serif text-[2.2rem] font-light text-primary"
        >
          {t("nav.reserve")}
        </Link>

        {/* Mobile language & theme */}
        <div className="flex items-center gap-4 mt-4">
          <button onClick={toggleTheme} className="p-2 text-foreground/70 hover:text-primary transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs tracking-[0.1em] uppercase px-2 py-1 transition-colors ${
                  language === lang ? "text-primary border-b border-primary" : "text-foreground/50 hover:text-primary"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
