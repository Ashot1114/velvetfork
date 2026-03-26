import { useState } from "react";
import { CalendarDays, MessageSquare, LayoutDashboard, Clock, Users, TrendingUp, Eye, Trash2 } from "lucide-react";

type Reservation = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests: string;
  status: "new" | "confirmed" | "cancelled";
  createdAt: string;
};

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: "new" | "read";
  createdAt: string;
};

const mockReservations: Reservation[] = [
  { id: 1, name: "James Whitfield", email: "james@email.com", phone: "+1 (212) 555-0199", date: "2026-04-02", time: "7:30 PM", guests: 4, requests: "Anniversary dinner, corner table preferred", status: "new", createdAt: "2026-03-25" },
  { id: 2, name: "Elena Rossi", email: "elena.r@email.com", phone: "+1 (646) 555-0142", date: "2026-04-05", time: "8:00 PM", guests: 2, requests: "Vegetarian tasting menu", status: "confirmed", createdAt: "2026-03-24" },
  { id: 3, name: "Marcus Chen", email: "m.chen@email.com", phone: "+1 (917) 555-0167", date: "2026-04-01", time: "6:30 PM", guests: 6, requests: "Birthday celebration, need cake service", status: "new", createdAt: "2026-03-23" },
  { id: 4, name: "Sophia Laurent", email: "sophia.l@email.com", phone: "+1 (347) 555-0188", date: "2026-03-30", time: "9:00 PM", guests: 2, requests: "", status: "confirmed", createdAt: "2026-03-22" },
  { id: 5, name: "David Park", email: "dpark@email.com", phone: "+1 (212) 555-0134", date: "2026-04-08", time: "7:00 PM", guests: 8, requests: "Chef's table if available", status: "cancelled", createdAt: "2026-03-21" },
];

const mockMessages: Message[] = [
  { id: 1, name: "Catherine Bell", email: "cbell@email.com", message: "We're planning a corporate event for 30 guests in May. Could you provide a custom menu and pricing?", status: "new", createdAt: "2026-03-25" },
  { id: 2, name: "Tom Richardson", email: "tom.r@email.com", message: "Is it possible to arrange a private chef's table experience for a proposal evening?", status: "new", createdAt: "2026-03-24" },
  { id: 3, name: "Amara Osei", email: "amara@email.com", message: "Wonderful dinner last weekend! Would love to know if you offer gift cards.", status: "read", createdAt: "2026-03-22" },
];

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "reservations", label: "Reservations", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: MessageSquare },
] as const;

type TabId = (typeof tabs)[number]["id"];

const statusColors: Record<string, string> = {
  new: "bg-primary/15 text-primary border border-primary/30",
  confirmed: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-400 border border-red-500/30",
  read: "bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/20",
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [reservations, setReservations] = useState(mockReservations);
  const [messages, setMessages] = useState(mockMessages);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const stats = [
    { label: "Total Reservations", value: reservations.length, icon: CalendarDays },
    { label: "Pending", value: reservations.filter(r => r.status === "new").length, icon: Clock },
    { label: "Total Guests", value: reservations.reduce((sum, r) => sum + r.guests, 0), icon: Users },
    { label: "New Messages", value: messages.filter(m => m.status === "new").length, icon: MessageSquare },
  ];

  const handleConfirm = (id: number) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "confirmed" as const } : r));
  };

  const handleCancel = (id: number) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "cancelled" as const } : r));
  };

  const handleMarkRead = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: "read" as const } : m));
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-[1400px] mx-auto px-[5%] py-8">
          <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-primary mb-2">Management</p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-foreground">Admin Panel</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-[5%] py-8">
        {/* Tabs */}
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

        {/* Dashboard */}
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

            {/* Recent reservations */}
            <div className="bg-muted border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-[0.72rem] tracking-[0.2em] uppercase text-primary font-medium">Recent Reservations</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Guest</th>
                      <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Date</th>
                      <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Time</th>
                      <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Party</th>
                      <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Status</th>
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
                          <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${statusColors[r.status]}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reservations */}
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
                        ["Booked on", selectedReservation.createdAt],
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
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {selectedReservation.requests || "None"}
                    </p>
                    <span className="text-[0.68rem] tracking-[0.15em] uppercase text-primary block mb-2">Status</span>
                    <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase mb-6 ${statusColors[selectedReservation.status]}`}>
                      {selectedReservation.status}
                    </span>
                    {selectedReservation.status === "new" && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => { handleConfirm(selectedReservation.id); setSelectedReservation({ ...selectedReservation, status: "confirmed" }); }}
                          className="px-6 py-3 text-[0.72rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary-light transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => { handleCancel(selectedReservation.id); setSelectedReservation({ ...selectedReservation, status: "cancelled" }); }}
                          className="px-6 py-3 text-[0.72rem] tracking-[0.15em] uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          Cancel
                        </button>
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
                        <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Guest</th>
                        <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Email</th>
                        <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Date</th>
                        <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Time</th>
                        <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Guests</th>
                        <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Status</th>
                        <th className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">Actions</th>
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
                            <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${statusColors[r.status]}`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <button onClick={() => setSelectedReservation(r)} className="text-primary hover:text-primary-light transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Messages */}
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
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-serif text-primary text-lg">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-foreground text-sm font-medium">{m.name}</p>
                        <p className="text-muted-foreground text-xs">{m.email} · {m.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${statusColors[m.status]}`}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed ml-[52px] mb-4">{m.message}</p>
                  <div className="flex gap-3 ml-[52px]">
                    {m.status === "new" && (
                      <button onClick={() => handleMarkRead(m.id)} className="text-[0.68rem] tracking-[0.12em] uppercase text-primary hover:text-primary-light transition-colors">
                        Mark as read
                      </button>
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
      </div>
    </div>
  );
};

export default AdminPage;
