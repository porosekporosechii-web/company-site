'use client';

import { useState } from 'react';

interface Props { initialItems: string[]; }

export function ItemsEditor({ initialItems }: Props) {
  const [items, setItems] = useState<string[]>(initialItems);
  const [input, setInput] = useState('');

  function add() {
    const v = input.trim();
    if (!v) return;
    setItems((prev) => [...prev, v]);
    setInput('');
  }

  function remove(i: number) {
    setItems((prev) => prev.filter((_, j) => j !== i));
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-graphite dark:text-snow">Пункты услуги (список)</span>
      <input type="hidden" name="itemsJson" value={JSON.stringify(items)} />

      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="flex-1 text-sm text-graphite dark:text-snow bg-graphite/[0.04] dark:bg-white/[0.04] px-3 py-1.5">{item}</span>
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-500 hover:text-red-600 px-2">✕</button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); }}}
          className="flex-1 bg-snow dark:bg-surface-dark border border-graphite/20 dark:border-white/15 px-3 py-2 text-sm text-graphite dark:text-snow focus:outline-none focus:border-accent"
          placeholder="Добавить пункт и нажать Enter"
        />
        <button type="button" onClick={add} className="px-4 py-2 bg-graphite/10 dark:bg-white/10 text-sm font-semibold hover:bg-accent hover:text-snow transition-colors">
          +
        </button>
      </div>
    </div>
  );
}
