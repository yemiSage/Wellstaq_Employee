import { useEffect, useMemo, useRef } from "react";
import { CloseCircle, GalleryAdd } from "iconsax-react";

// Shared dashed-box cover image picker for Create Club/Challenge/Event: tap
// to browse, preview once chosen, tap the badge to clear.
export function CoverImageField({ label = "Cover image", hint, file, onChange }: { label?: string; hint?: string; file: File | null; onChange(file: File | null): void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  return (
    <div className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      <div className={`cover-picker${preview ? " has-image" : ""}`}>
        <button type="button" className="cover-picker-drop" onClick={() => inputRef.current?.click()}>
          {preview ? <img src={preview} alt="" /> : <span className="cover-picker-placeholder"><GalleryAdd size="22" color="currentColor" /><small>Upload cover image</small></span>}
        </button>
        {preview && <button type="button" className="cover-picker-remove" aria-label="Remove cover image" onClick={() => { onChange(null); if (inputRef.current) inputRef.current.value = ""; }}><CloseCircle size="20" color="currentColor" variant="Bold" /></button>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="sr-only" tabIndex={-1} onChange={(event) => onChange(event.target.files?.[0] ?? null)} />
      {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
    </div>
  );
}
