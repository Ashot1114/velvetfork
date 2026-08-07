import { useEffect, useState } from "react";
import { Plus, Trash2, RefreshCw, Pencil, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CATEGORIES = ["Starters", "Main Course", "Desserts", "Drinks"] as const;

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  tag: string;
  is_available: boolean;
  sort_order: number;
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Starters",
  image_url: "",
  tag: "",
  is_available: true,
  sort_order: 0,
};

const inputClass =
  "w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors";
const labelClass = "block text-[0.68rem] tracking-[0.15em] uppercase text-primary mb-2";

const AdminProductsPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) toast.error("Failed to load products");
    setProducts((data as Product[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (p: Product) => {
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      category: p.category,
      image_url: p.image_url,
      tag: p.tag,
      is_available: p.is_available,
      sort_order: p.sort_order,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) { toast.error("Name is required"); return; }
    if (name.length > 120) { toast.error("Name is too long"); return; }
    const price = Number(form.price);
    if (!Number.isFinite(price) || price < 0) { toast.error("Enter a valid price"); return; }

    const payload = {
      name,
      description: form.description.trim().slice(0, 1000),
      price,
      category: form.category,
      image_url: form.image_url.trim().slice(0, 500),
      tag: form.tag.trim().slice(0, 40),
      is_available: form.is_available,
      sort_order: Number(form.sort_order) || 0,
    };

    setSaving(true);
    const { error } = editingId
      ? await supabase.from("products").update(payload).eq("id", editingId)
      : await supabase.from("products").insert(payload);
    setSaving(false);

    if (error) { toast.error(error.message); return; }
    toast.success(editingId ? "Product updated" : "Product added");
    resetForm();
    load();
  };

  const handleDelete = async (p: Product) => {
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) { toast.error("Failed to delete"); return; }
    setProducts(prev => prev.filter(x => x.id !== p.id));
    toast.success("Product deleted");
  };

  const toggleAvailable = async (p: Product) => {
    const { error } = await supabase.from("products").update({ is_available: !p.is_available }).eq("id", p.id);
    if (error) { toast.error("Failed to update"); return; }
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, is_available: !x.is_available } : x));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-[0.72rem] tracking-[0.2em] uppercase text-primary font-medium">Menu Products</h3>
        <div className="flex gap-3">
          <button onClick={load} className="flex items-center gap-2 px-4 py-3 text-[0.7rem] tracking-[0.15em] uppercase border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
            className="flex items-center gap-2 px-5 py-3 text-[0.7rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary-light transition-colors"
          >
            {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showForm ? "Close" : "Add Product"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-muted border border-border p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Name</label>
            <input className={inputClass} value={form.name} maxLength={120} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Duck Confit" />
          </div>
          <div>
            <label className={labelClass}>Price ($)</label>
            <input className={inputClass} type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="42" />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select className={inputClass} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Tag (optional)</label>
            <input className={inputClass} value={form.tag} maxLength={40} onChange={e => setForm({ ...form, tag: e.target.value })} placeholder="Signature" />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Image URL (optional)</label>
            <input className={inputClass} value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea className={`${inputClass} min-h-[100px] resize-y`} maxLength={1000} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Sort order</label>
            <input className={inputClass} type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={form.is_available} onChange={e => setForm({ ...form, is_available: e.target.checked })} className="accent-primary w-4 h-4" />
              Visible on the menu
            </label>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" disabled={saving} className="px-8 py-3 text-[0.72rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary-light transition-colors disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Save changes" : "Add product"}
            </button>
            <button type="button" onClick={resetForm} className="px-8 py-3 text-[0.72rem] tracking-[0.15em] uppercase border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-muted border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                {["Product", "Category", "Price", "Tag", "Visible", "Actions"].map(h => (
                  <th key={h} className="text-left p-4 text-[0.68rem] tracking-[0.2em] uppercase text-primary font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Loading...</td></tr>}
              {!loading && products.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No products yet</td></tr>
              )}
              {!loading && products.map(p => (
                <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-primary/[0.04] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.image_url && <img src={p.image_url} alt={p.name} className="w-10 h-10 object-cover" loading="lazy" />}
                      <div>
                        <p className="text-foreground">{p.name}</p>
                        <p className="text-muted-foreground text-xs line-clamp-1 max-w-[280px]">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{p.category}</td>
                  <td className="p-4 text-primary font-serif">${Number(p.price).toFixed(2)}</td>
                  <td className="p-4 text-muted-foreground">{p.tag || "—"}</td>
                  <td className="p-4">
                    <button onClick={() => toggleAvailable(p)} className={`px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase border ${p.is_available ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-border text-muted-foreground"}`}>
                      {p.is_available ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button onClick={() => startEdit(p)} className="text-primary hover:text-primary-light transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p)} className="text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPanel;