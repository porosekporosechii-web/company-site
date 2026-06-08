'use client';

import { useState } from 'react';
import { slugify } from '@/lib/slug';
import { FormField, inputClass } from './AdminShell';

interface Props {
  titleLabel?: string;
  titlePlaceholder?: string;
  defaultTitle?: string;
  defaultSlug?: string;
  /** Если форма редактирования — slug уже задан, авто-подстановку не включаем по умолчанию. */
  edit?: boolean;
}

export function TitleSlugFields({
  titleLabel = 'Название',
  titlePlaceholder,
  defaultTitle = '',
  defaultSlug = '',
  edit = false,
}: Props) {
  const [title, setTitle] = useState(defaultTitle);
  const [slug, setSlug] = useState(defaultSlug);
  // В режиме создания slug автоследует за названием, пока пользователь не правил его вручную.
  const [slugTouched, setSlugTouched] = useState(edit);

  return (
    <>
      <FormField label={titleLabel} htmlFor="title">
        <input
          id="title"
          name="title"
          required
          value={title}
          placeholder={titlePlaceholder}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </FormField>

      <FormField label="Slug (URL)" htmlFor="slug" hint="Латиница, цифры, дефис. Генерируется из названия — можно изменить.">
        <input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }}
          className={inputClass}
          placeholder="posm-store-2024"
        />
      </FormField>
    </>
  );
}
