import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking } from '../types/Booking'

interface InitialStateValues {
  bookings: Booking[]
}

const initialState: InitialStateValues = {
  bookings: [],
}

const booking = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Booking>) {
      state.bookings = [...state.bookings, action.payload]
    },
    remove(state, action: PayloadAction<number>) {
      const bookingFound = state.bookings.find(
        (element) => element.hotel.id === action.payload
      )
      if (!!bookingFound) {
        const index = state.bookings.indexOf(bookingFound, 0)
        state.bookings.splice(index, 1)
      }
    },
    edit(state, action: PayloadAction<Booking>) {
      const index = state.bookings.findIndex(
        (element) => element.hotel.id === action.payload.hotel.id
      )
      state.bookings[index] = {
        ...state.bookings[index],
        endDate: action.payload.endDate,
        startDate: action.payload.startDate,
      }
    },
  },
})

export const { add, remove, edit } = booking.actions
export default booking.reducer
