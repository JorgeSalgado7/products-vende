export function notificationResponse<T>(
  data: T | null,
  error: boolean,
  message: string | null,
  status: number
) {
  return {
    data,
    notification: {
      error,
      message,
      status,
    },
  }
}
