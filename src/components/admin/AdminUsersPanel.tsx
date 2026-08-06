import { useEffect, useState } from "react";
import { ShieldCheck, ShieldOff, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_admin: boolean;
};

const AdminUsersPanel = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [callerId, setCallerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const call = async (action: "list" | "grant" | "revoke", userId?: string) => {
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action, userId },
    });
    if (error || (data as { error?: string })?.error) {
      throw new Error((data as { error?: string })?.error || "Request failed");
    }
    const payload = data as { users: AdminUser[]; callerId: string };
    setUsers(payload.users);
    setCallerId(payload.callerId);
  };

  const load = async () => {
    setLoading(true);
    try {
      await call("list");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load users");
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggle = async (u: AdminUser) => {
    setBusyId(u.id);
    try {
      await call(u.is_admin ? "revoke" : "grant", u.id);
      toast.success(u.is_admin ? `Admin removed from ${u.email}` : `${u.email} is now an admin`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
    setBusyId(null);
  };

  const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString() : "—");

  return (
    <div className="bg-muted border border-border">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-[0.72rem] tracking-[0.2em] uppercase text-primary font-medium">Admin Access</h3>
          <p className="text-muted-foreground text-xs mt-1">Grant or remove the admin role for registered email addresses.</p>
        </div>
        <button onClick={load} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Refresh users">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground text-sm">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                {["Email", "Registered", "Last sign in", "Role", "Action"].map((h) => (
                  <th key={h} className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-b-0 hover:bg-primary/[0.04] transition-colors">
                  <td className="p-4 text-foreground">{u.email}</td>
                  <td className="p-4 text-muted-foreground">{fmt(u.created_at)}</td>
                  <td className="p-4 text-muted-foreground">{fmt(u.last_sign_in_at)}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${u.is_admin ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/20"}`}>
                      {u.is_admin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      disabled={busyId === u.id || (u.is_admin && u.id === callerId)}
                      onClick={() => toggle(u)}
                      className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.12em] uppercase text-primary hover:text-primary-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {u.is_admin ? <ShieldOff className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      {u.is_admin ? "Remove admin" : "Make admin"}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPanel;
