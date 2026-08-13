import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAvatarUrl } from "@/hooks/useAvatarUrl";
import { useToast } from "@/hooks/use-toast";
import { User as UserIcon, Camera, Loader2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}

const ProfileEditor = ({ user }: Props) => {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>((user.user_metadata?.name as string) || "");
  const [avatarPath, setAvatarPath] = useState<string | null>(
    (user.user_metadata?.avatar_path as string) || null
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const avatarUrl = useAvatarUrl(avatarPath);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please choose an image file", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image must be smaller than 5 MB", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setUploading(false);
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      return;
    }

    const { error } = await supabase.auth.updateUser({ data: { avatar_path: path } });
    setUploading(false);
    if (error) {
      toast({ title: "Could not save photo", description: error.message, variant: "destructive" });
      return;
    }
    if (avatarPath) await supabase.storage.from("avatars").remove([avatarPath]);
    setAvatarPath(path);
    toast({ title: "Profile photo updated" });
  };

  const handleSaveName = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: { name: name.trim() } });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save name", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Name updated" });
  };

  return (
    <div className="border border-border p-6 mb-10">
      <div className="flex items-center gap-5 flex-wrap">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center group"
          aria-label="Upload profile photo"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile photo" className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-8 h-8 text-primary" />
          )}
          <span className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {uploading ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Camera className="w-5 h-5 text-primary" />
            )}
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
            e.target.value = "";
          }}
        />

        <div className="flex-1 min-w-[220px]">
          <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Display name
          </label>
          <div className="flex gap-3 flex-wrap">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="Your name"
              className="flex-1 min-w-[160px] bg-transparent border border-border px-4 py-2.5 text-sm text-foreground focus:border-primary outline-none"
            />
            <button
              onClick={handleSaveName}
              disabled={saving}
              className="px-6 py-2.5 text-[0.72rem] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
