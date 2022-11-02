import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking } from '../types/Booking'

const initialState: Booking[] = []

const booking = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Booking>) {
      state.push(action.payload)
    },
    remove(state, action: PayloadAction<number>) {
      const booking = state.find(
        (booking) => booking.hotel.id === action.payload
      )
      if (!!booking) {
        const index = state.indexOf(booking, 0)
        state = state.splice(index, 1)
      }
    },
    edit(state, action: PayloadAction<Booking>) {
      state.forEach((element) => {
        if (element.hotel.id === action.payload.hotel.id)
          element = { ...action.payload }
      })
    },
  },
})

export const { add, remove, edit } = booking.actions
export default booking.reducer
