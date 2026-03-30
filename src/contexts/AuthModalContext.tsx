import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalContextType {
  isOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType>({
  isOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  // Show modal on first load if not logged in
  useEffect(() => {
    if (!loading && !user) {
      const dismissed = sessionStorage.getItem("vf-auth-dismissed");
      if (!dismissed) {
        setIsOpen(true);
      }
    }
  }, [loading, user]);

  const openAuthModal = () => setIsOpen(true);
  const closeAuthModal = () => {
    setIsOpen(false);
    sessionStorage.setItem("vf-auth-dismissed", "true");
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
