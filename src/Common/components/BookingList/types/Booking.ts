import { HotelResponse } from './HotelResponse'

export interface Booking {
  hotel: HotelResponse
  startDate: string
  endDate: string
}
