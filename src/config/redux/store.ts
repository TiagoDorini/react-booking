import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import bookingReducer from '../../Common/components/BookingList/redux/Booking.store'

const store = configureStore({
  reducer: combineReducers({
    booking: bookingReducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export default store
