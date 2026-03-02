# Интеграция с бэкендом

## Цель

Подключить API так, чтобы:

- не засорить страницы сетевой логикой
- сохранить текущую модульную структуру
- упростить замену моков на реальные данные
- сделать одинаковый подход для всех ролей и экранов

## Главный принцип

Компонент страницы не должен знать детали HTTP-запроса.

Страница должна работать примерно так:

1. вызывает data-hook
2. получает `data`, `loading`, `error`
3. передаёт данные в presentational-компоненты
4. вызывает actions из hook или API-слоя по событиям пользователя

## Рекомендуемая структура для модуля

Пример для очереди валидатора:

```text
src/pages/dashboard/validator-queue/
  api/
    validatorQueueApi.ts
    validatorQueue.mapper.ts
    validatorQueue.dto.ts
  hooks/
    useValidatorQueueData.ts
    useValidatorQueueMutations.ts
    useValidatorQueueQuery.ts
  types/
    validator-queue.types.ts
  components/
  ValidatorQueuePage.tsx
```

## Что где хранить

### `api/*.dto.ts`

Типы ответа сервера и тела запросов.

Пример:

```ts
export type ValidatorQueueItemDto = {
  id: number
  project_name: string
  artifact_name: string
  priority: 'P1' | 'P2' | 'P3' | 'P4' | 'P5'
  created_at: string
}
```

### `api/*.mapper.ts`

Преобразование DTO в UI-модель.

Это важно, потому что:

- серверные поля часто в `snake_case`
- UI ожидает удобную структуру и локализованные значения
- формат даты, статусов и ролей может отличаться

Пример:

```ts
import type { ValidatorQueueItemDto } from './validatorQueue.dto'
import type { ValidatorQueueItem } from '../types/validator-queue.types'

export function mapValidatorQueueItem(dto: ValidatorQueueItemDto): ValidatorQueueItem {
  return {
    id: dto.id,
    projectName: dto.project_name,
    artifactName: dto.artifact_name,
    priorityLabel: dto.priority.replace('P', 'П') as ValidatorQueueItem['priorityLabel'],
    date: new Date(dto.created_at).toLocaleDateString('ru-RU'),
    tag: '#Без тега',
    phaseTag: '#Без фазы',
    files: [],
    requirements: '',
  }
}
```

### `api/*Api.ts`

Функции реальных запросов.

Пример:

```ts
import { apiClient } from '../../../shared/api/client'
import type { ValidatorQueueItemDto } from './validatorQueue.dto'

export async function getValidatorQueue() {
  return apiClient.get<ValidatorQueueItemDto[]>('/validator/queue')
}

export async function approveValidatorItem(id: number, payload: { comment: string }) {
  return apiClient.post(`/validator/queue/${id}/approve`, payload)
}
```

### `hooks/use...Data.ts`

Загрузка данных модуля.

Пример:

```ts
import { useEffect, useState } from 'react'
import { getValidatorQueue } from '../api/validatorQueueApi'
import { mapValidatorQueueItem } from '../api/validatorQueue.mapper'
import type { ValidatorQueueItem } from '../types/validator-queue.types'

export function useValidatorQueueData() {
  const [data, setData] = useState<ValidatorQueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    void getValidatorQueue()
      .then((items) => {
        if (!active) return
        setData(items.map(mapValidatorQueueItem))
      })
      .catch(() => {
        if (!active) return
        setError('Не удалось загрузить очередь')
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { data, loading, error }
}
```

### `hooks/use...Query.ts`

Только локальная работа с уже загруженным набором данных:

- поиск
- сортировка
- фильтрация
- группировка
- подсветка

Именно так сейчас уже устроены:

- [`src/pages/dashboard/validator-queue/hooks/useValidatorQueueQuery.ts`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/validator-queue/hooks/useValidatorQueueQuery.ts)
- [`src/pages/dashboard/specialist-open-projects/hooks/useOpenProjectsQuery.tsx`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/specialist-open-projects/hooks/useOpenProjectsQuery.tsx)

Это хороший паттерн. Его стоит сохранить.

## Базовый API-клиент

Имеет смысл завести единый клиент, например:

```text
src/shared/api/
  client.ts
  types.ts
  errors.ts
```

Что должен уметь `client.ts`:

- подставлять `baseUrl` из `import.meta.env`
- добавлять `Authorization` при наличии токена
- централизованно обрабатывать `401/403/500`
- возвращать типизированный JSON

Минимальный пример:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('access_token')

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
}
```

## Как заменять моки на API

### 1. Оставить UI-типы

Например, в [`src/pages/dashboard/validator-queue/types/validator-queue.types.ts`](/home/user/Desktop/123/SOTA/sota/src/pages/dashboard/validator-queue/types/validator-queue.types.ts) можно сохранить `ValidatorQueueItem` как UI-модель.

### 2. Убрать моковые константы из `types`

Сейчас там лежит `QUEUE_ITEMS`. После подключения API лучше:

- перенести моки в `__mocks__` или `mock-data.ts`
- оставить в `types` только типы

### 3. Подменить источник данных в странице

Было:

```ts
const { query, setQuery, sort, setSort, filteredSortedItems } = useValidatorQueueQuery(QUEUE_ITEMS)
```

Должно стать по смыслу:

```ts
const { data, loading, error } = useValidatorQueueData()
const { query, setQuery, sort, setSort, filteredSortedItems } = useValidatorQueueQuery(data)
```

### 4. Добавить состояния загрузки и ошибок

Для каждой страницы стоит явно отрисовывать:

- `loading`
- `error`
- `empty`
- `success`

Сейчас часть экранов рассчитана на наличие данных по умолчанию.

## Приоритет интеграции по модулям

Если подключать бэкенд поэтапно, разумный порядок такой:

1. `auth` и базовая сессия
2. `customer-new-project`, потому что это ключевой сценарий создания сущности
3. `specialist-open-projects` и `specialist-dashboard`
4. `customer-project` и `specialist-active-project`
5. `validator-queue`
6. профили и вторичные экраны

## Что лучше сделать до начала работ

### Обязательно

- определить базовый URL API через `VITE_API_BASE_URL`
- описать контракт авторизации
- согласовать DTO с бэкендом по ключевым сущностям
- решить, где хранится access token и refresh token

### Желательно

- ввести `react-router`
- выбрать библиотеку для серверного состояния: нативные хуки или `@tanstack/react-query`
- определить единый формат ошибок API

## Пример распределения API по сущностям

Если проект пойдёт в сторону более строгой архитектуры, можно выносить не page-level API, а entity-level:

```text
src/entities/project/
  api/
  model/
  types/

src/entities/user/
  api/
  model/
  types/
```

Тогда страницы будут только собирать сценарий из сущностей и features.

## Итоговая рекомендация

Для текущего состояния репозитория самый безопасный путь такой:

1. добавить `src/shared/api/client.ts`
2. в каждом крупном модуле создать папку `api`
3. написать `dto + mapper + data-hook`
4. подключать страницу к data-hook, не меняя локальные UI-хуки
5. только после этого переносить общую доменную логику в `entities` и `features`

Такой подход даст быстрый старт интеграции и не потребует сразу переписывать весь проект.
