'use client';

import { useRef, useState } from 'react';

interface Props {
  name: string;
  current?: string | null;
  label?: string;
}

export function ImageUpload({ name, current, label = 'Изображение' }: Props) {
  const [preview, setPreview] = useState<string | null>(current ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? 'Upload failed');
      }
      const { url } = await res.json() as { url: string };
      setPreview(url);
      if (hiddenRef.current) hiddenRef.current.value = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-graphite dark:text-snow">{label}</span>

      <input type="hidden" name={name} ref={hiddenRef} defaultValue={current ?? ''} />

      {preview && (
        <div className="relative w-48 h-32 border border-graphite/15 dark:border-white/15 overflow-hidden">
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(null); if (hiddenRef.current) hiddenRef.current.value = ''; }}
            className="absolute top-1 right-1 bg-graphite/70 text-snow text-xs px-1.5 py-0.5 hover:bg-red-500 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <div
        className="border border-dashed border-graphite/20 dark:border-white/15 p-4 text-center cursor-pointer hover:border-accent transition-colors"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        {uploading ? (
          <p className="text-xs text-muted">Загрузка…</p>
        ) : (
          <p className="text-xs text-muted">Нажмите или перетащите файл (JPG, PNG, WebP — до 10 МБ)</p>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
