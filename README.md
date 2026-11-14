# Боди Детектив

Учебная игра про устройство тела на основе 3D-атласа [ashemag/human-atlas](https://github.com/ashemag/human-atlas) (React + Three.js + Vite + TypeScript). Текущая цель — демо v0.1 «Зажимы»: кровеносная система, наведение на сосуды и мини-игра «поставь зажим с правильной стороны от пробоины».

- План демо: [docs/plan-demo-v0.1.md](docs/plan-demo-v0.1.md)
- Игровая концепция: [docs/game-design.md](docs/game-design.md)
- Заметки для Claude Code: [CLAUDE.md](CLAUDE.md)

Это учебная игра, не медицинская инструкция.

## Ветки и удалённые репозитории

| Что | Где |
| --- | --- |
| `origin` | https://github.com/galogen88/body-detective — наш форк |
| `upstream` | https://github.com/ashemag/human-atlas — оригинальный атлас |
| `main` | повторяет `upstream/main`, своих правок сюда не кладём |
| `game` | вся работа над игрой |

Подтянуть свежий атлас:

```sh
git fetch upstream
git checkout main && git merge --ff-only upstream/main && git push origin main
git checkout game && git merge main
```

## Запуск локально

Нужен Node.js 22.13 или новее. Ключи и аккаунты не нужны.

```sh
npm ci
npm run dev
```

Открыть http://localhost:3016. Остановить — `Ctrl+C`.

## Проверки перед коммитом и деплоем

```sh
npm run check                       # TypeScript
node scripts/validate-atlas.mjs     # меши, имена, бинарные буферы
node scripts/validate-interactions.mjs
npm run build                       # статическая сборка в dist/
```

Собранную версию можно посмотреть локально: `npx vite preview`, затем открыть http://localhost:4173. Сайт статический, без сервера и переменных окружения. Сборка весит около 110 МБ, из них около 33 МБ — сжатая геометрия.

## Деплой на Vercel

В репозитории уже есть `vercel.json`: установка `npm ci`, сборка `npm run build`, результат в `dist`, фреймворк Vite. Вручную эти настройки задавать не нужно.

### Первый раз (через сайт)

1. Запушить ветки на GitHub: `git push -u origin main game`.
2. Зайти на https://vercel.com, войти через GitHub. Тариф Hobby бесплатный для некоммерческих проектов.
3. **Add New → Project → Import Git Repository** → выбрать `galogen88/body-detective`. Если репозитория нет в списке, нажать **Adjust GitHub App Permissions** и дать Vercel доступ к нему.
4. На экране настройки проекта:
   - **Framework Preset** — Vite (подставится из `vercel.json`);
   - **Root Directory** — оставить корень `./`;
   - Build / Output / Install — не трогать, их задаёт `vercel.json`.
5. **Deploy**. Через пару минут появится ссылка вида `https://body-detective-<...>.vercel.app`.
6. В **Settings → Build and Deployment → Node.js Version** выбрать 22.x или новее, если там стоит более старая версия.

### Дальше — автоматически

- Push в `main` — продакшн-деплой на основную ссылку.
- Push в `game` или любую другую ветку — preview-деплой с отдельной ссылкой. Ссылка появляется в Vercel и в pull request на GitHub.
- Ветку для продакшна можно поменять в **Settings → Environments → Production → Branch Tracking**. Например, на `game`, пока демо не слито в `main`.

### Через командную строку (без сайта)

```sh
npx vercel login
npx vercel link        # один раз: привязать папку к проекту Vercel
npx vercel             # preview-деплой текущего состояния папки
npx vercel --prod      # продакшн-деплой
```

CLI собирает проект на серверах Vercel по тем же правилам из `vercel.json`. Папка `.vercel/` с привязкой уже в `.gitignore`.

### После деплоя проверить

- Ссылка открывается на ноутбуке и на телефоне, модель загружается.
- В консоли браузера нет ошибок загрузки файлов из `/models/`.
- Доступна атрибуция BodyParts3D (кнопка «Source & credits» / экран «Титры»).

### Если что-то пошло не так

- **Сборка падает на установке** — проверить версию Node.js в настройках проекта (нужна 22.13+), и что `package-lock.json` закоммичен.
- **Белый экран, 404 на `/models/...`** — убедиться, что Output Directory — `dist`, а не переопределён в настройках проекта.
- **Откатить** — в **Deployments** выбрать предыдущий рабочий деплой → **⋯ → Promote to Production** (или **Instant Rollback**).

## Другие хостинги

Подойдёт любой статический хостинг: команда сборки `npm run build`, папка `dist`, Node.js 22.13+.

- **Netlify / Cloudflare Pages** — импорт репозитория с этими настройками.
- **GitHub Pages** — сайт открывается по пути `/body-detective/`, поэтому сначала нужно добавить `base: '/body-detective/'` в `vite.config.ts`. Сейчас это не настроено.

## Лицензии и атрибуция

- Код атласа — MIT ([LICENSE](LICENSE)), автор — ashemag.
- Анатомические данные — **BodyParts3D 4.0, CC BY 4.0**. Атрибуцию в [public/ATTRIBUTION.md](public/ATTRIBUTION.md) и ссылку на неё в интерфейсе сохраняем при любых изменениях и в каждом деплое.

Подробности об устройстве атласа (как склеены меши, пересборка геометрии, WebMCP) — в [README оригинала](https://github.com/ashemag/human-atlas#readme).
