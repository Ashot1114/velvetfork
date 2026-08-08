import { useEffect, useState } from "react";
import { RefreshCw, Ban, CheckCircle2, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ROLES = ["admin", "manager", "staff", "editor", "user"] as const;
type Role = (typeof ROLES)[number];

type AdminUser = {
  id: string;
  email: string;
  name: string;
  phone: string;
  provider: string;
  email_confirmed_at: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  role: Role | null;
  is_admin: boolean;
  blocked: boolean;
};

const AdminUsersPanel = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [callerId, setCallerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pwUser, setPwUser] = useState<AdminUser | null>(null);
  const [pwValue, setPwValue] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const call = async (
    action: "list" | "setRole" | "setBlocked" | "setPassword",
    userId?: string,
    role?: Role | null,
    blocked?: boolean,
    password?: string,
  ) => {
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action, userId, role, blocked, password },
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

  const setRole = async (u: AdminUser, value: string) => {
    const role = value === "none" ? null : (value as Role);
    setBusyId(u.id);
    try {
      await call("setRole", u.id, role);
      toast.success(role ? `${u.email} is now ${role}` : `Role removed from ${u.email}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
    setBusyId(null);
  };

  const toggleBlocked = async (u: AdminUser) => {
    setBusyId(u.id);
    try {
      await call("setBlocked", u.id, undefined, !u.blocked);
      toast.success(!u.blocked ? `${u.email} blocked` : `${u.email} unblocked`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    }
    setBusyId(null);
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwUser) return;
    if (pwValue.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setPwSaving(true);
    try {
      await call("setPassword", pwUser.id, undefined, undefined, pwValue);
      toast.success(`New password set for ${pwUser.email}`);
      setPwUser(null);
      setPwValue("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to set password");
    }
    setPwSaving(false);
  };

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

  return (
    <div className="bg-muted border border-border">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-[0.72rem] tracking-[0.2em] uppercase text-primary font-medium">Roles &amp; Access</h3>
          <p className="text-muted-foreground text-xs mt-1">
            {users.length} registered {users.length === 1 ? "account" : "accounts"} — details and role assignment.
          </p>
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
                {["Name", "Email", "Phone", "Sign-in method", "Verified", "Registered", "Last sign in", "Current role", "Assign role", "Status", "Access", "Password"].map((h) => (
                  <th key={h} className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={`border-b border-border last:border-b-0 hover:bg-primary/[0.04] transition-colors ${u.blocked ? "opacity-60" : ""}`}>
                  <td className="p-4 text-foreground whitespace-nowrap">{u.name || "—"}</td>
                  <td className="p-4 text-foreground">{u.email || "—"}</td>
                  <td className="p-4 text-muted-foreground whitespace-nowrap">{u.phone || "—"}</td>
                  <td className="p-4 text-muted-foreground capitalize">{u.provider}</td>
                  <td className="p-4">
                    <span className={`text-[0.65rem] tracking-[0.1em] uppercase ${u.email_confirmed_at ? "text-primary" : "text-muted-foreground"}`}>
                      {u.email_confirmed_at ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground whitespace-nowrap">{fmt(u.created_at)}</td>
                  <td className="p-4 text-muted-foreground whitespace-nowrap">{fmt(u.last_sign_in_at)}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${u.is_admin ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted-foreground/15 text-muted-foreground border border-muted-foreground/20"}`}>
                      {u.role ?? "None"}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={u.role ?? "none"}
                      disabled={busyId === u.id || u.id === callerId}
                      onChange={(e) => setRole(u, e.target.value)}
                      className="bg-card border border-border text-foreground text-[0.72rem] tracking-[0.08em] uppercase px-3 py-2 focus:outline-none focus:border-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="none">No role</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase ${u.blocked ? "bg-destructive/15 text-destructive border border-destructive/30" : "bg-primary/10 text-primary border border-primary/25"}`}>
                      {u.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => toggleBlocked(u)}
                      disabled={busyId === u.id || u.id === callerId}
                      className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-[0.68rem] tracking-[0.1em] uppercase text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {u.blocked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                      {u.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => { setPwUser(u); setPwValue(""); }}
                      className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 text-[0.68rem] tracking-[0.1em] uppercase text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      Change
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={12} className="p-8 text-center text-muted-foreground">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {pwUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4" onClick={() => setPwUser(null)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={savePassword}
            className="w-full max-w-md border border-border bg-card p-8"
          >
            <h4 className="text-[0.72rem] tracking-[0.2em] uppercase text-primary font-medium">Set new password</h4>
            <p className="mt-2 text-sm text-muted-foreground">{pwUser.email}</p>
            <input
              type="text"
              autoFocus
              value={pwValue}
              onChange={(e) => setPwValue(e.target.value)}
              placeholder="New password (min. 8 characters)"
              maxLength={72}
              className="mt-6 w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Share this password with the user and ask them to change it after signing in.
            </p>
            <div className="mt-6 flex gap-3">
              <button type="submit" disabled={pwSaving} className="px-6 py-3 text-[0.7rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary-light transition-colors disabled:opacity-50">
                {pwSaving ? "Saving..." : "Save password"}
              </button>
              <button type="button" onClick={() => setPwUser(null)} className="px-6 py-3 text-[0.7rem] tracking-[0.15em] uppercase border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPanel;
