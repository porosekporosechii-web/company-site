# Развёртывание проекта на новом компьютере

Пошаговая инструкция для запуска сайта на втором/третьем рабочем месте.

## 1. Установить инструменты

| | Откуда | Как проверить |
|---|---|---|
| **Node.js 22 LTS** | https://nodejs.org/ (выберите LTS) | `node --version` → `v22.x.x` |
| **Git** | https://git-scm.com/download/win | `git --version` |
| **VS Code** (рекомендуется) | https://code.visualstudio.com/ | — |

После установки **перезапустить PowerShell**, чтобы PATH подхватился.

## 2. Клонировать репозиторий

```powershell
cd C:\Projects   # или любая папка, где удобно хранить
git clone https://github.com/<ваш-логин>/<имя-репо>.git rauco-site
cd rauco-site
```

Если репозиторий приватный — git попросит логин/пароль или Personal Access Token.

## 3. Установить зависимости

```powershell
npm install
```

Установит ~400 пакетов (включая `sharp` для оптимизации картинок и `prisma` для админ-панели). Займёт 1–3 минуты.

## 4. Создать `.env`

```powershell
Copy-Item .env.example .env
```

Открыть `.env` в VS Code и заполнить:

- `NEXTAUTH_SECRET` — любая случайная строка ≥32 символа. Сгенерировать в PowerShell:
  ```powershell
  [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
  ```
- `ADMIN_PASSWORD_HASH` — хэш пароля админ-панели (нужен только если планируете заходить в `/admin`):
  ```powershell
  npx tsx scripts/hash-password.ts <ваш-пароль>
  ```
  Скопировать полученную строку в `ADMIN_PASSWORD_HASH=`.

Остальные значения (`NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, `NEXTAUTH_URL`, `ADMIN_USERNAME`, `UPLOAD_DIR`) можно оставить как есть для локальной разработки.

## 5. Создать локальную БД админ-панели

```powershell
npm run db:push     # создаст prisma/db.sqlite по схеме
npm run db:seed     # необязательно: заполнит начальными данными
```

## 6. Запустить dev-сервер

```powershell
npm run dev
```

Откроется на http://localhost:3000. Изменения в коде подхватываются автоматически.

---

## Дополнительно: импортировать новые фото в портфолио

Если планируете добавлять работы с этого компа:

1. Положите папку с фото где-нибудь, например `D:\Портфолио\` с подпапками-категориями (см. `scripts/import-portfolio.mjs` — формат описан в шапке файла).
2. Запустите:
   ```powershell
   npm run import-portfolio -- "D:\Портфолио\"
   ```
3. Скрипт сгенерирует:
   - `public/images/portfolio/` — оптимизированные WebP
   - `lib/portfolio.generated.ts` — данные для сайта
4. Закоммитьте оба и запушьте:
   ```powershell
   git add lib/portfolio.generated.ts public/images/portfolio/
   git commit -m "portfolio: import new works"
   git push
   ```
5. На первом компе сделайте `git pull` — изменения подтянутся.

---

## Цикл работы между компьютерами

**Перед началом работы (на любом компе):**
```powershell
git pull
```

**После того как поработали:**
```powershell
git add .
git commit -m "что сделано"
git push
```

**Если git ругается на конфликты** (работали с двух мест одновременно):  
Откройте отмеченные файлы в VS Code — там будут разделители `<<<<<<<`, `=======`, `>>>>>>>`. Выберите нужную версию, удалите маркеры, потом `git add` + `git commit`.

---

## Что НЕ переносится через git

| Что | Как переносить |
|---|---|
| Исходные фото (RAW для `npm run import-portfolio`) | Внешний диск / Dropbox / Яндекс.Диск |
| `prisma/db.sqlite` (локальная БД админа) | Создаётся заново через `db:push` |
| `.env` (секреты) | Защищённый канал: 1Password, шифрованный архив |
| `node_modules` | Создаётся через `npm install` |

---

## Что-то не работает?

| Симптом | Что сделать |
|---|---|
| `npm run dev` → ошибка про порт | Закрыть другие dev-серверы или сменить порт: `npm run dev -- --port 3001` |
| Картинки портфолио не показываются | Проверить, что `public/images/portfolio/` подтянулся из git |
| Админка `/admin` падает | Проверить `.env` (особенно `NEXTAUTH_SECRET`) и что выполнили `npm run db:push` |
| Кириллица в консоли отображается как абракадабра | В PowerShell выполнить `chcp 65001` (включает UTF-8) |
