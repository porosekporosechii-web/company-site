'use client';

import { useRef, useState } from 'react';

interface Props {
  initialImages: string[];
}

export function GalleryManager({ initialImages }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json() as { url: string };
      setImages((prev) => [...prev, url]);
    } finally {
      setUploading(false);
    }
  }

  function remove(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-graphite dark:text-snow">Галерея (дополнительные фото)</span>
      <input type="hidden" name="galleryJson" value={JSON.stringify(images)} />

      <div className="flex flex-wrap gap-2">
        {images.map((url, i) => (
          <div key={i} className="relative w-24 h-16 border border-graphite/15 dark:border-white/15 overflow-hidden">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-0.5 right-0.5 bg-graphite/70 text-snow text-[10px] px-1 py-0.5 hover:bg-red-500 transition-colors leading-none"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-24 h-16 border border-dashed border-graphite/20 dark:border-white/15 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-colors text-xs"
        >
          {uploading ? '…' : '+ Фото'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            files.forEach(uploadFile);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}
