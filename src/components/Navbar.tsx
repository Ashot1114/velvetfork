import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
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
        <Link to="/" className="font-serif text-2xl font-normal tracking-wide mr-auto text-foreground">
          Velvet <span className="text-primary">Fork</span>
        </Link>

        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs tracking-[0.18em] uppercase transition-colors relative group ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {link.label}
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

        <Link
          to="/reserve"
          className="hidden md:inline-flex ml-8 text-[0.72rem] tracking-[0.18em] uppercase px-5 py-2.5 border border-primary text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          Reserve
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
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="font-serif text-[2.2rem] font-light text-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/reserve"
          className="font-serif text-[2.2rem] font-light text-primary"
        >
          Reserve
        </Link>
      </div>
    </>
  );
};

export default Navbar;
