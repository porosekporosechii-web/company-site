import type { Metadata } from 'next';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Телефон ${company.phone.display}, ${company.email.display}. ${company.address.full}. Расчёт стоимости бесплатно, ответим в течение 30 минут.`,
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
