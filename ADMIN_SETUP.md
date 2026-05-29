# Установка админ-панели

Эти команды выполняются один раз. Все из корня `company-site/`.

## 1. Установить новые пакеты

```bash
npm install
```

Установит `prisma`, `@prisma/client`, `next-auth`, `bcryptjs`, `tsx` и другие.

## 2. Создать `.env.local`

Скопируйте `.env.example` → `.env.local`:

```bash
cp .env.example .env.local
```

Заполните в `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://rauco.ru
DATABASE_URL="file:./prisma/db.sqlite"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<сюда длинная случайная строка>
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<сюда хэш пароля>
```

### Сгенерировать NEXTAUTH_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Сгенерировать ADMIN_PASSWORD_HASH

```bash
npx tsx scripts/hash-password.ts ВашНовыйПароль123!
```

Вывод — длинная строка вида `$2a$12$...`. Скопируйте в `ADMIN_PASSWORD_HASH=`.

## 3. Создать БД и наполнить данными

```bash
npm run db:push    # создаст SQLite файл и таблицы
npm run db:seed    # перенесёт текущие данные сайта в БД
```

После этого `prisma/db.sqlite` — рабочая БД.

## 4. Запустить и войти

```bash
npm run dev
```

Откройте http://localhost:3000/admin — попадёте на страницу логина. Введите `ADMIN_USERNAME` и пароль (НЕ хэш, исходный пароль). Должны увидеть сводку.

## Просмотр БД руками

```bash
npm run db:studio
```

Откроет веб-интерфейс Prisma Studio на http://localhost:5555 — можно смотреть и редактировать таблицы напрямую (полезно для отладки).
