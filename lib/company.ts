export const company = {
  name: 'R A U C O',
  legalName: 'RAUCO',
  phone: {
    display: '+7 (977) 173-85-79',
    href: 'tel:+79771738579',
  },
  phoneAlt: {
    display: '+7 (977) 173-85-79',
    href: 'tel:+79771738579',
  },
  email: {
    display: 'info@rauco.ru',
    href: 'mailto:info@rauco.ru',
  },
  address: {
    city: 'г. Москва',
    street: 'ул. 4-я Кабельная, д. 2, стр. 1А',
    full: 'г. Москва, ул. 4-я Кабельная, д. 2, стр. 1А',
    metro: 'Авиамоторная',
  },
  hours: {
    weekdays: 'Пн–Пт: 10:00 – 20:00',
    saturday: '',
    short: 'Пн–Пт 10:00 – 20:00',
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
