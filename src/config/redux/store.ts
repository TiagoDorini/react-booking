import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from '../../Common/components/BookingList/redux/Booking.store'
const store = configureStore({
  reducer: {
    hotel: bookingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
