import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MessageSquare, LayoutDashboard, Clock, Users, TrendingUp, Eye, Trash2, LogOut, Settings } from "lucide-react";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests: string;
  status: string;
  created_at: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
};

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "reservations", label: "Reservations", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = (typeof tabs)[number]["id"];

const statusColors: Record<string, string> = {
  new: "bg-primary/15 text-primary border border-primary/30",
  confirmed: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-400 border border-red-500/30",
  read: "bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/20",
};

const AdminPage = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setDataLoading(true);
      const [resResult, msgResult] = await Promise.all([
        supabase.from("reservations").select("*").order("created_at", { ascending: false }),
        supabase.from("messages").select("*").order("created_at", { ascending: false }),
      ]);
      if (resResult.data) setReservations(resResult.data);
      if (msgResult.data) setMessages(msgResult.data);
      setDataLoading(false);
    };
    fetchData();
  }, [user]);

  const handleUpdateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (selectedReservation?.id === id) setSelectedReservation(prev => prev ? { ...prev, status } : null);
    toast.success(`Reservation ${status}`);
  };

  const handleMarkRead = async (id: string) => {
    const { error } = await supabase.from("messages").update({ status: "read" }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: "read" } : m));
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    setMessages(prev => prev.filter(m => m.id !== id));
    toast.success("Message deleted");
  };

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  const stats = [
    { label: "Total Reservations", value: reservations.length, icon: CalendarDays },
    { label: "Pending", value: reservations.filter(r => r.status === "new").length, icon: Clock },
    { label: "Total Guests", value: reservations.reduce((sum, r) => sum + r.guests, 0), icon: Users },
    { label: "New Messages", value: messages.filter(m => m.status === "new").length, icon: MessageSquare },
  ];

  const formatDate = (d: string) => new Date(d).toLocaleDateString();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-[1400px] mx-auto px-[5%] py-8 flex items-center justify-between">
          <div>
            <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-2">Management</p>
            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-foreground">Admin Panel</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-[0.72rem] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] py-8">
        <div className="flex gap-0 border border-primary/20 overflow-hidden mb-8 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-[0.72rem] tracking-[0.15em] uppercase transition-all border-r border-primary/20 last:border-r-0 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading data...</div>
        ) : (
          <>
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map(stat => (
                    <div key={stat.label} className="bg-muted border border-border p-6 transition-colors hover:border-primary/30">
                      <div className="flex items-center justify-between mb-4">
                        <stat.icon className="w-5 h-5 text-primary" />
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="font-serif text-3xl font-light text-foreground mb-1">{stat.value}</p>
                      <p className="text-[0.7rem] tracking-[0.15em] uppercase text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-muted border border-border">
                  <div className="p-6 border-b border-border">
                    <h3 className="text-[0.72rem] tracking-[0.2em] uppercase text-primary font-medium">Recent Reservations</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          {["Guest", "Date", "Time", "Party", "Status"].map(h => (
                            <th key={h} className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.slice(0, 3).map(r => (
                          <tr key={r.id} className="border-b border-border last:border-b-0 hover:bg-primary/[0.04] transition-colors">
                            <td className="p-4 text-foreground">{r.name}</td>
                            <td className="p-4 text-muted-foreground">{r.date}</td>
                            <td className="p-4 text-muted-foreground">{r.time}</td>
                            <td className="p-4 text-muted-foreground">{r.guests}</td>
                            <td className="p-4">
                              <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${statusColors[r.status] || ""}`}>{r.status}</span>
                            </td>
                          </tr>
                        ))}
                        {reservations.length === 0 && (
                          <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No reservations yet</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reservations" && (
              <div className="space-y-6">
                {selectedReservation ? (
                  <div className="bg-muted border border-border p-8">
                    <button onClick={() => setSelectedReservation(null)} className="text-[0.72rem] tracking-[0.15em] uppercase text-primary mb-6 hover:text-primary-light transition-colors">
                      ← Back to list
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="font-serif text-2xl text-foreground">{selectedReservation.name}</h3>
                        <div className="space-y-3">
                          {[
                            ["Email", selectedReservation.email],
                            ["Phone", selectedReservation.phone],
                            ["Date", selectedReservation.date],
                            ["Time", selectedReservation.time],
                            ["Guests", `${selectedReservation.guests}`],
                            ["Booked on", formatDate(selectedReservation.created_at)],
                          ].map(([label, val]) => (
                            <div key={label}>
                              <span className="text-[0.68rem] tracking-[0.15em] uppercase text-primary block mb-0.5">{label}</span>
                              <span className="text-foreground text-sm">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[0.68rem] tracking-[0.15em] uppercase text-primary block mb-2">Special Requests</span>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{selectedReservation.requests || "None"}</p>
                        <span className="text-[0.68rem] tracking-[0.15em] uppercase text-primary block mb-2">Status</span>
                        <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase mb-6 ${statusColors[selectedReservation.status] || ""}`}>{selectedReservation.status}</span>
                        {selectedReservation.status === "new" && (
                          <div className="flex gap-3 mt-4">
                            <button onClick={() => handleUpdateStatus(selectedReservation.id, "confirmed")} className="px-6 py-3 text-[0.72rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary-light transition-colors">Confirm</button>
                            <button onClick={() => handleUpdateStatus(selectedReservation.id, "cancelled")} className="px-6 py-3 text-[0.72rem] tracking-[0.15em] uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Cancel</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-card">
                            {["Guest", "Email", "Date", "Time", "Guests", "Status", "Actions"].map(h => (
                              <th key={h} className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {reservations.map(r => (
                            <tr key={r.id} className="border-b border-border last:border-b-0 hover:bg-primary/[0.04] transition-colors">
                              <td className="p-4 text-foreground">{r.name}</td>
                              <td className="p-4 text-muted-foreground">{r.email}</td>
                              <td className="p-4 text-muted-foreground">{r.date}</td>
                              <td className="p-4 text-muted-foreground">{r.time}</td>
                              <td className="p-4 text-muted-foreground">{r.guests}</td>
                              <td className="p-4">
                                <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${statusColors[r.status] || ""}`}>{r.status}</span>
                              </td>
                              <td className="p-4">
                                <button onClick={() => setSelectedReservation(r)} className="text-primary hover:text-primary-light transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {reservations.length === 0 && (
                            <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No reservations yet</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <MessageSquare className="w-10 h-10 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No messages yet</p>
                  </div>
                ) : (
                  messages.map(m => (
                    <div key={m.id} className={`bg-muted border p-6 transition-all hover:border-primary/30 ${m.status === "new" ? "border-primary/20" : "border-border"}`}>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-serif text-primary text-lg">{m.name.charAt(0)}</div>
                          <div>
                            <p className="text-foreground text-sm font-medium">{m.name}</p>
                            <p className="text-muted-foreground text-xs">{m.email} · {formatDate(m.created_at)}</p>
                          </div>
                        </div>
                        <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${statusColors[m.status] || ""}`}>{m.status}</span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed ml-[52px] mb-4">{m.message}</p>
                      <div className="flex gap-3 ml-[52px]">
                        {m.status === "new" && (
                          <button onClick={() => handleMarkRead(m.id)} className="text-[0.68rem] tracking-[0.12em] uppercase text-primary hover:text-primary-light transition-colors">Mark as read</button>
                        )}
                        <button onClick={() => handleDeleteMessage(m.id)} className="text-[0.68rem] tracking-[0.12em] uppercase text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <ChangePasswordForm />
              </div>
            )}
        )}
      </div>
    </div>
  );
};

export default AdminPage;
