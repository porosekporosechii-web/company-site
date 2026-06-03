'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  onClose: () => void;
  service?: string;
  source?: string;
}

export function RequestModal({ onClose, service, source }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(service ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) { setError('Введите номер телефона'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
          source: source ?? '',
        }),
      });
      if (!res.ok) throw new Error();
      onClose();
      router.push('/thank-you');
    } catch {
      setError('Ошибка при отправке. Попробуйте позвонить или написать напрямую.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-graphite/80 backdrop-blur-sm" />

      <div className="relative w-full max-w-[480px] bg-graphite border border-white/[0.08] overflow-hidden shadow-2xl">
        {/* Accent top line */}
        <div className="h-[3px] bg-gradient-to-r from-accent via-led to-accent" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-8 h-[2px] bg-led" />
                <span className="text-led text-[10px] font-semibold tracking-[0.25em] uppercase">
                  Заявка
                </span>
              </div>
              <h2 className="font-bold text-snow text-2xl leading-tight">
                Получите бесплатный<br />расчёт стоимости
              </h2>
              <p className="text-muted text-sm mt-2">
                Перезвоним в течение 30 минут
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted hover:text-snow border border-white/10 hover:border-white/30 transition-colors ml-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-snow placeholder-white/25 focus:outline-none focus:border-accent transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                Телефон <span className="text-led">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-snow placeholder-white/25 focus:outline-none focus:border-accent transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted uppercase tracking-[0.2em] mb-2">
                Комментарий
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Опишите задачу: тип изделия, размеры, сроки…"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 text-snow placeholder-white/25 focus:outline-none focus:border-accent transition-colors resize-none text-sm"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 border border-red-400/20 bg-red-400/5 px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-accent hover:bg-led disabled:opacity-50 disabled:cursor-not-allowed text-snow font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Отправляем…
                </>
              ) : (
                <>
                  Отправить заявку
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-[11px] text-muted/50 text-center leading-relaxed">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
