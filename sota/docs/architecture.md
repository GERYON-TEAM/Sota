# Архитектура проекта

## Назначение

Проект реализует интерфейсы для трёх основных ролей:

- специалист
- заказчик
- валидатор

Дополнительно есть auth-flow и служебные экраны.

На текущем этапе проект организован как набор самостоятельных экранных модулей. Основная бизнес-логика пока находится рядом со страницами, а не в отдельном доменном слое.

## Текущее устройство

### Точка входа

- [`src/main.tsx`](/home/user/Desktop/123/SOTA/sota/src/main.tsx) создаёт React-root и монтирует приложение.
- [`src/App.tsx`](/home/user/Desktop/123/SOTA/sota/src/App.tsx) определяет, какой экран рендерить, исходя из `window.location.pathname`.

Это простой и рабочий вариант для UI-прототипа, но по мере роста проекта маршрутизацию лучше вынести в полноценный роутер.

## Слои

### `src/pages`

Главный рабочий слой проекта. Здесь находятся экранные модули, их локальные компоненты, стили, хуки и типы.

Типичная структура модуля:

```text
module/
  components/
  hooks/
  styles/
  types/
  ModulePage.tsx
  index.ts
```

### `src/shared`

Общие UI-компоненты, которые переиспользуются между страницами:

- `logo`
- `auth-shape`
- `progress-steps`
- `eye-icon`
- `color-dots`

Если появляется универсальный визуальный элемент без привязки к конкретной роли или экрану, ему место здесь.

### `src/app`, `src/entities`, `src/features`, `src/widgets`, `src/processes`

Эти слои пока почти пустые и выступают как архитектурный резерв.

Рекомендуемое назначение:

- `app` -> провайдеры приложения, роутер, глобальные стили, инициализация
- `entities` -> доменные сущности: `user`, `project`, `invite`, `artifact`, `validation`
- `features` -> прикладные действия пользователя: `login`, `publish-project`, `respond-to-project`
- `widgets` -> крупные составные блоки, переиспользуемые на нескольких страницах
- `processes` -> длинные межэкранные сценарии

## Карта функциональных модулей

### Auth

Папка: [`src/pages/auth`](/home/user/Desktop/123/SOTA/sota/src/pages/auth)

Содержит:

- вход
- регистрация
- подтверждение почты
- восстановление пароля

Ответственность:
- сбор данных формы
- локальный UI и навигация после submit

Не хватает:
- API авторизации
- валидации ответа сервера
- хранения токена и сессии

### Specialist Dashboard

Папка: [`src/pages/dashboard/specialist-dashboard`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/specialist-dashboard)

Содержит:

- сайдбар
- хедер
- статистику
- активные проекты
- инвайты

Особенность:
- данные создаются локально внутри страницы через `useMemo`

### Specialist Open Projects

Папка: [`src/pages/dashboard/specialist-open-projects`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/specialist-open-projects)

Содержит:

- каталог проектов
- поиск
- подсказки
- сортировки
- фильтры

Особенность:
- `useOpenProjectsQuery.tsx` сейчас отвечает только за локальный поиск и подсветку текста

### Specialist Active Project

Папка: [`src/pages/dashboard/specialist-active-project`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/specialist-active-project)

Содержит:

- рабочее пространство
- вкладки
- канбан
- модальные окна
- элементы чата

Особенность:
- модуль уже похож на полноценный рабочий кабинет, поэтому при интеграции API здесь стоит раньше других отделить UI-хуки от data-хуков

### Specialist Profile

Папка: [`src/pages/dashboard/specialist-profile`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/specialist-profile)

Содержит:

- профиль
- секции данных
- модалки редактирования
- загрузку аватара

### Specialist Portfolio

Папка: [`src/pages/specialist-portfolio`](/home/user/Desktop/123/SOTA/sota/src/pages/specialist-portfolio)

Содержит:

- карточку профиля
- навыки
- цели
- отзывы
- завершённые проекты

### Customer Dashboard

Папка: [`src/pages/dashboard/customer-dashboard`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/customer-dashboard)

Структурно повторяет кабинет специалиста, но под роль заказчика.

### Customer New Project

Папка: [`src/pages/dashboard/customer-new-project`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/customer-new-project)

Один из самых насыщенных модулей.

Содержит:

- многошаговую форму
- локальную валидацию
- автосохранение черновика
- работу с файлами
- итоговый обзор перед публикацией

Особенность:
- хороший кандидат для выделения в отдельный feature-модуль публикации проекта

### Customer Project

Папка: [`src/pages/dashboard/customer-project`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/customer-project)

Содержит:

- детали проекта
- бюджет и сроки
- кандидатов
- чат
- действия над проектом

### Customer Project Portfolio

Папка: [`src/pages/dashboard/customer-project-portfolio`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/customer-project-portfolio)

Содержит проектное портфолио и сопутствующие материалы.

### Customer Profile

Папка: [`src/pages/dashboard/customer-profile`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/customer-profile)

Отвечает за профиль и настройки заказчика.

### Validator Queue

Папка: [`src/pages/dashboard/validator-queue`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/validator-queue)

Содержит:

- список задач на проверку
- пагинацию
- карточку выбранного элемента
- чек-лист
- модалки отклонения и массовых действий

Особенность:
- моковые данные лежат прямо в [`src/pages/dashboard/validator-queue/types/validator-queue.types.ts`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/validator-queue/types/validator-queue.types.ts)
- `useValidatorQueueQuery.ts` выполняет только локальную фильтрацию и сортировку

### Validator Profile

Папка: [`src/pages/dashboard/validator-profile`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/validator-profile)

Профиль пользователя роли валидатора.

## Паттерны, которые уже используются

### 1. Модуль рядом с собой хранит всё нужное

Компоненты, хуки, стили и типы лежат рядом со страницей. Это удобно для локальной разработки и уменьшает случайные зависимости.

### 2. `index.ts` используется как точка входа

В ряде модулей есть реэкспорт `index.ts`, через который наружу отдаётся страница.

### 3. UI-состояние выделено в хуки

Например:

- dropdown-состояния
- поиск
- сортировки
- пагинация
- автосохранение

Это уже хороший фундамент, потому что сетевую логику можно добавить рядом, не ломая UI-часть.

## Архитектурные ограничения текущей версии

- маршрутизация ручная и не масштабируется
- API-слой отсутствует
- моковые данные часто лежат рядом с типами
- многие страницы содержат и представление, и данные, и часть сценарной логики одновременно
- нет единого места для авторизации, ошибок API и конфигурации окружений

## Рекомендуемое направление развития

### Ближайший этап

- добавить `react-router`
- ввести единый `api/client.ts`
- вынести environment variables для базового URL API
- отделить DTO от UI-типов

### Следующий этап

- переносить общие доменные модели в `entities`
- переносить пользовательские сценарии в `features`
- выносить составные повторяющиеся блоки в `widgets`

### Когда проект станет продуктовым

- добавить нормальную обработку состояний `loading`, `error`, `empty`
- определить права ролей и guard-логику маршрутов
- ввести слой тестов для ключевых сценариев
