# SOTA Frontend

Фронтенд проекта `SOTA` на `React + TypeScript + Vite`.

Репозиторий сейчас содержит клиентскую часть приложения: экраны авторизации, кабинеты специалиста, заказчика и валидатора, формы, модалки, локальное UI-состояние и моковые данные. Этот README описывает только фронт.

## Стек

- `React 19`
- `TypeScript`
- `Vite`
- `ESLint`
- CSS без UI-библиотеки

## Требования

- `Node.js 20+`
- `npm 10+`

## Быстрый старт

Установка зависимостей:

```bash
npm install
```

Запуск dev-сервера:

```bash
npm run dev
```

По умолчанию Vite поднимает фронт на `http://localhost:5173`.

Если нужен доступ снаружи `localhost`:

```bash
npm run dev -- --host 0.0.0.0
```

Сборка production-версии:

```bash
npm run build
```

Локальный просмотр production-сборки:

```bash
npm run preview
```

Проверка линтером:

```bash
npm run lint
```

## Скрипты

Скрипты описаны в [package.json](/home/user/Desktop/123/SOTA/package.json).

- `npm run dev` — запуск Vite
- `npm run build` — typecheck и production build
- `npm run preview` — локальный preview собранного фронта
- `npm run lint` — проверка ESLint

## Как устроен фронт

Основная точка входа маршрутов находится в [src/App.tsx](/home/user/Desktop/123/SOTA/src/App.tsx).

Сейчас во фронте нет `react-router`: переходы собраны вручную через `window.location.pathname` и прямые `window.location.href`.

Основные директории:

```text
src/
  app/
  entities/
  features/
  pages/
  processes/
  shared/
  widgets/
```

Что лежит внутри:

- `src/pages` — основные экранные модули
- `src/shared` — переиспользуемые UI-элементы и утилиты
- `src/widgets`, `src/features`, `src/entities`, `src/processes` — задел под более модульную архитектуру

## Актуальные маршруты

### Авторизация

- `/` — логин
- `/register`
- `/register/success`
- `/forgot`
- `/forgot/reset`
- `/loading`

### Кабинет специалиста

- `/dashboard/specialist`
- `/dashboard/specialist/portfolio`
- `/dashboard/specialist/portfolio/project`
- `/dashboard/specialist/open-projects`
- `/dashboard/specialist/open-projects/project`
- `/dashboard/specialist/project`
- `/dashboard/specialist/project/chat`
- `/dashboard/specialist/profile`
- `/dashboard/specialist/invites/project`

### Кабинет заказчика

- `/dashboard/customer`
- `/dashboard/custom`
- `/dashboard/customer/new-project`
- `/dashboard/custom/new-project`
- `/dashboard/customer/profile`
- `/dashboard/custom/profile`
- `/dashboard/customer/project`
- `/dashboard/custom/project`

Примечание:

- страниц портфолио у заказчика больше нет;
- старые пути вида `/dashboard/customer/project/portfolio` и `/dashboard/custom/project/portfolio` редиректят обратно на страницу проекта.

### Кабинет валидатора

- `/queue/validator`
- `/dashboard/validator`
- `/queue/validator/profile`
- `/dashboard/validator/profile`

## Основные экранные модули

### `src/pages/auth`

Экраны входа, регистрации, подтверждения почты и восстановления пароля.

### `src/pages/dashboard/specialist-dashboard`

Главная страница специалиста: карточки проектов, инвайты, уведомления.

### `src/pages/dashboard/specialist-open-projects`

Каталог открытых проектов для специалиста с фильтрацией, сортировкой и поиском.

### `src/pages/dashboard/specialist-project`

Карточка проекта до входа в активную работу.

### `src/pages/dashboard/specialist-active-project`

Рабочее пространство активного проекта: канбан, чат, модалки, артефакты, история.

### `src/pages/dashboard/specialist-profile`

Профиль специалиста и его настройки.

### `src/pages/specialist-portfolio`

Портфолио специалиста и блоки с навыками, отзывами и завершёнными проектами.

### `src/pages/dashboard/customer-dashboard`

Главная страница заказчика.

### `src/pages/dashboard/customer-new-project`

Многошаговая форма создания и публикации нового проекта.

### `src/pages/dashboard/customer-project`

Страница проекта заказчика: описание, отклики, выбранные специалисты и связанные действия.

### `src/pages/dashboard/customer-profile`

Профиль заказчика.

### `src/pages/dashboard/validator-queue`

Очередь валидатора и рабочие модалки проверки.

### `src/pages/dashboard/validator-profile`

Профиль валидатора.

## Особенности текущей реализации

- большая часть данных пока захардкожена или хранится локально в состоянии компонентов;
- стили организованы по страницам и компонентам, без внешней дизайн-системы;
- часть директорий содержит задел под дальнейшую декомпозицию, но не вся архитектура ещё приведена к единому стандарту;
- в репозитории могут встречаться неиспользуемые или legacy-экраны, но актуальное поведение надо сверять по [src/App.tsx](/home/user/Desktop/123/SOTA/src/App.tsx).

## Где смотреть конкретные зоны

- авторизация: [src/pages/auth](/home/user/Desktop/123/SOTA/src/pages/auth)
- кабинет специалиста: [src/pages/dashboard/specialist-dashboard](/home/user/Desktop/123/SOTA/src/pages/dashboard/specialist-dashboard)
- активный проект специалиста: [src/pages/dashboard/specialist-active-project](/home/user/Desktop/123/SOTA/src/pages/dashboard/specialist-active-project)
- кабинет заказчика: [src/pages/dashboard/customer-dashboard](/home/user/Desktop/123/SOTA/src/pages/dashboard/customer-dashboard)
- создание проекта заказчиком: [src/pages/dashboard/customer-new-project](/home/user/Desktop/123/SOTA/src/pages/dashboard/customer-new-project)
- профиль заказчика: [src/pages/dashboard/customer-profile](/home/user/Desktop/123/SOTA/src/pages/dashboard/customer-profile)
- валидатор: [src/pages/dashboard/validator-queue](/home/user/Desktop/123/SOTA/src/pages/dashboard/validator-queue)
