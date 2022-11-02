import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../config/redux/store'
import { add, edit, remove } from '../redux/Booking.store'
import { Booking } from '../types/Booking'

export const useBooking = () => {
  const dispatch = useDispatch()

  const addBooking = useCallback((newBooking: Booking) => {
    dispatch(add(newBooking))
  }, [])

  const deleteBooking = useCallback((bookingId: number) => {
    dispatch(remove(bookingId))
  }, [])

  const editBooking = useCallback((editBooking: Booking) => {
    dispatch(edit(editBooking))
  }, [])

  const userReservations = useSelector((state: RootState) => state.booking)
  const bookedIds = userReservations.map((reservation) => reservation.hotel.id)

  return { addBooking, deleteBooking, editBooking, userReservations, bookedIds }
}
