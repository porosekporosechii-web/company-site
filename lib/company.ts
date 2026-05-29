export const company = {
  name: 'МеталлЛофт',
  legalName: 'ООО «МеталлЛофт»',
  phone: {
    display: '+7 (495) 123-45-67',
    href: 'tel:+74951234567',
  },
  phoneAlt: {
    display: '+7 (916) 000-11-22',
    href: 'tel:+79160001122',
  },
  email: {
    display: 'info@metalloft.ru',
    href: 'mailto:info@metalloft.ru',
  },
  address: {
    city: 'г. Москва',
    street: 'ул. Промышленная, д. 12, стр. 3',
    full: 'г. Москва, ул. Промышленная, д. 12, стр. 3',
    metro: 'Печатники',
  },
  hours: {
    weekdays: 'Пн–Пт: 9:00 – 18:00',
    saturday: 'Сб: 10:00 – 15:00',
    short: 'Пн–Пт 9:00 – 18:00',
  },
  requisites: {
    inn: '7701234567',
    kpp: '770101001',
    ogrn: '1147700123456',
    legalAddress: 'г. Москва, ул. Промышленная, д. 12, стр. 3',
  },
  socials: {
    telegram: 'https://t.me/',
    whatsapp: 'https://wa.me/74951234567',
  },
  founded: 2014,
  stats: {
    yearsOnMarket: '10+',
    completedOrders: '500+',
    workshopArea: '800',
    teamSize: '14',
    directions: '6',
  },
};

export const serviceDirections = [
  { id: 'pos',     label: 'Оформление мест продаж' },
  { id: 'retail',  label: 'Торговое оборудование' },
  { id: 'outdoor', label: 'Наружная реклама' },
  { id: 'led',     label: 'Светодиодные экраны' },
  { id: 'decor',   label: 'Декорации' },
  { id: 'textile', label: 'Текстильные лайтбоксы' },
] as const;
