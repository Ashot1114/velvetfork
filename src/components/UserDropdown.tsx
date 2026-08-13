import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, ChevronDown, History, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAvatarUrl } from "@/hooks/useAvatarUrl";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const { openAuthModal } = useAuthModal();
  const { t } = useLanguage();
  const avatarUrl = useAvatarUrl(user?.user_metadata?.avatar_path as string | undefined);
  const displayName = (user?.user_metadata?.name as string | undefined) || user?.email;

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
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile photo"
            className="w-6 h-6 rounded-full object-cover border border-border"
          />
        ) : (
          <User className="w-4 h-4" />
        )}
        <span className="max-w-[120px] truncate hidden lg:inline">{displayName}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border py-1 min-w-[200px] z-50">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile photo" className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </span>
            )}
            <div className="min-w-0">
              <p className="text-sm text-foreground truncate">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="w-full px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
          >
            <History className="w-3.5 h-3.5" />
            {t("profile.myReservations")}
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="w-full px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Panel
            </Link>
          )}
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
