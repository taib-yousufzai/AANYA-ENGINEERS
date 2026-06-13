import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value: string; // current img URL
  onChange: (url: string) => void;
  error?: string;
}

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic client-side validation
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be smaller than 5 MB.");
      return;
    }

    setUploadError(null);
    setUploading(true);

    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("images")
      .upload(filename, file, { upsert: false });

    if (uploadErr) {
      setUploadError("Upload failed. Please try again.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filename);
    onChange(data.publicUrl);
    setUploading(false);

    // Reset input so the same file can be re-selected if needed
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleClear() {
    onChange("");
    setUploadError(null);
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {value ? (
        <div className="relative w-full max-w-xs">
          <img
            src={value}
            alt="Uploaded preview"
            className="rounded-lg border object-cover w-full max-h-40"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="w-full max-w-xs gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading…" : "Upload Image"}
        </Button>
      )}

      {(uploadError || error) && (
        <p className="text-sm text-destructive">{uploadError ?? error}</p>
      )}
    </div>
  );
}
