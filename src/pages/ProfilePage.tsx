import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Calendar, Clock, Users, FileText } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  completed: "bg-primary/20 text-primary",
};

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReservations(data);
    }
    setLoading(false);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("admin.loading")}</p>
      </div>
    );
  }

  return (
    <>
      <PageHero
        topLabel={t("profile.myAccount")}
        title={t("profile.title")}
        subtitle={t("profile.subtitle")}
      />

      <section className="py-20 px-[5%]">
        <div className="max-w-4xl mx-auto">
          {/* User Info */}
          <div className="border border-border p-6 mb-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("profile.loggedInAs")}</p>
              <p className="text-foreground font-medium">{user.email}</p>
            </div>
          </div>

          {/* Reservation History */}
          <h2 className="font-serif text-2xl font-light text-foreground mb-6">
            {t("profile.reservationHistory")}
          </h2>

          {loading ? (
            <p className="text-muted-foreground">{t("admin.loadingData")}</p>
          ) : reservations.length === 0 ? (
            <div className="border border-border p-10 text-center">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t("profile.noReservations")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((r) => (
                <div key={r.id} className="border border-border p-5 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-medium">{r.date}</span>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{r.time}</span>
                    </div>
                    <span className={`text-xs tracking-[0.12em] uppercase px-3 py-1 ${statusColors[r.status] || "bg-muted text-muted-foreground"}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {r.guests} {r.guests === 1 ? t("reserve.guest") : t("reserve.guests")}
                    </span>
                    {r.requests && (
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        {r.requests}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    {t("admin.bookedOn")} {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
