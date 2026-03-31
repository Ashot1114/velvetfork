import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown, History } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useLanguage } from "@/contexts/LanguageContext";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { t } = useLanguage();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) {
    return (
      <button
        onClick={openAuthModal}
        className="p-2 text-foreground/70 hover:text-primary transition-colors"
        aria-label="Sign in"
      >
        <User className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs tracking-[0.1em] text-foreground/70 hover:text-primary transition-colors p-2"
      >
        <User className="w-4 h-4" />
        <span className="max-w-[120px] truncate hidden lg:inline">{user.email}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border py-1 min-w-[200px] z-50">
          <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border truncate">
            {user.email}
          </div>
          <button
            onClick={() => { signOut(); setOpen(false); }}
            className="w-full text-left px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            {t("auth.signOut")}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
