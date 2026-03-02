export const formatRub = (value: number) => `${value.toLocaleString('ru-RU')}₽`

export const formatRate = (value: number) => `${formatRub(value)} / час`
