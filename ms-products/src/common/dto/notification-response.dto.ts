export class NotificationResponseDto<T> {
  data: T | null
  notification: {
    error: boolean
    message: string | null
    status: number
  }

  constructor(
    data: T | null,
    notification: { 
			error: boolean; 
			message: string | null; 
			status: number 
	}
  ) {
    this.data = data
    this.notification = notification
  }
}
