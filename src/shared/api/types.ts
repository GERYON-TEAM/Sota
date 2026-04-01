export type ApiError = {
  status: number
  detail: string
}

export type PaginationInfo = {
  total: number
  page: number
  limit: number
  pages: number
}
