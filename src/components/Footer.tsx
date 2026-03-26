import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary border-t border-border px-[5%] pt-20 pb-8 transition-colors">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-[1300px] mx-auto mb-16">
      <div>
        <Link to="/" className="font-serif text-[1.6rem] block mb-5 text-foreground">
          Velvet <span className="text-primary">Fork</span>
        </Link>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          A fine dining experience where classical technique meets contemporary vision. Every plate is a story, every evening a memory.
        </p>
        <div className="flex gap-4">
          {["IG", "FB", "TW"].map((s) => (
            <span
              key={s}
              className="w-[38px] h-[38px] border border-border flex items-center justify-center text-muted-foreground text-xs hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-6 font-medium">Navigation</h4>
        <ul className="flex flex-col gap-3">
          {[["Home", "/"], ["Menu", "/menu"], ["About", "/about"], ["Gallery", "/gallery"], ["Contact", "/contact"]].map(([label, to]) => (
            <li key={to}>
              <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-6 font-medium">Hours</h4>
        <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
          <li>Mon — Thu: 5:30 PM – 10 PM</li>
          <li>Fri — Sat: 5:00 PM – 11 PM</li>
          <li>Sunday: 5:00 PM – 9:30 PM</li>
          <li className="text-primary mt-2">Brunch: Sat & Sun 11 AM – 2 PM</li>
        </ul>
      </div>
      <div>
        <h4 className="text-[0.72rem] tracking-[0.22em] uppercase text-primary mb-6 font-medium">Contact</h4>
        <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
          <li>42 Gansevoort Street</li>
          <li>New York, NY 10014</li>
          <li>+1 (212) 555-0178</li>
          <li>hello@velvetfork.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border pt-6 max-w-[1300px] mx-auto flex items-center justify-between flex-wrap gap-4">
      <span className="text-xs text-muted-foreground">© 2024 Velvet Fork. All rights reserved.</span>
      <span className="text-xs text-muted-foreground">Designed with passion in NYC</span>
    </div>
  </footer>
);

export default Footer;
