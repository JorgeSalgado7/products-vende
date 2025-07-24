export interface ApiResponse<T> {
  data: T
  notification: {
    error: boolean
    message: string | null
    status: number
  }
}
