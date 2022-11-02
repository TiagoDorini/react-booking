import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './config/redux/store'
import { BookingPages } from './Pages/BookingPages'

export const ReactBookingApp = () => {
  const theme = createTheme()
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router>
              <BookingPages />
            </Router>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}
