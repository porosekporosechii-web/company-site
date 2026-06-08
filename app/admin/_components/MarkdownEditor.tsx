'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  name: string;
  defaultValue?: string;
}

export function MarkdownEditor({ name, defaultValue = '' }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <div className="flex flex-col gap-0 border border-graphite/20 dark:border-white/15">
      {/* Tabs */}
      <div className="flex border-b border-graphite/10 dark:border-white/10">
        {(['write', 'preview'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-semibold transition-colors ${
              tab === t
                ? 'bg-accent text-snow'
                : 'text-muted hover:text-graphite dark:hover:text-snow'
            }`}
          >
            {t === 'write' ? 'Редактор' : 'Превью'}
          </button>
        ))}
      </div>

      {/* textarea всегда в DOM, иначе при сохранении из вкладки «Превью» поле не попадёт в форму */}
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full bg-snow dark:bg-surface-dark px-4 py-3 text-sm text-graphite dark:text-snow font-mono resize-y min-h-[400px] focus:outline-none ${tab === 'write' ? '' : 'hidden'}`}
        placeholder="# Заголовок&#10;&#10;Текст статьи в формате Markdown…"
      />
      {tab === 'preview' && (
        <div className="px-6 py-4 min-h-[400px] prose prose-sm lg:prose-base dark:prose-invert prose-headings:font-bold prose-a:text-accent max-w-none bg-snow dark:bg-surface-dark">
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-muted italic">Нет контента для предпросмотра</p>
          )}
        </div>
      )}
    </div>
  );
}
