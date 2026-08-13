import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** Resolves a signed URL for an avatar stored in the private `avatars` bucket. */
export const useAvatarUrl = (path?: string | null) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!path) {
      setUrl(null);
      return;
    }
    supabase.storage
      .from("avatars")
      .createSignedUrl(path, 60 * 60)
      .then(({ data }) => {
        if (active) setUrl(data?.signedUrl ?? null);
      });
    return () => {
      active = false;
    };
  }, [path]);

  return url;
};
