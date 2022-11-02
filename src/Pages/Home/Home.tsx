import { CircularProgress } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { BookingList } from '../../Common/components/BookingList/containers/BookingList'
import { useBooking } from '../../Common/components/BookingList/hooks/useBooking'
import { useBookingImages } from '../../Common/components/BookingList/hooks/useBookingImages'
import { HotelCollectionResponse } from '../../Common/components/BookingList/types/HotelResponse'
import { Colors } from '../../Common/enums/Colors'

const useStyles = makeStyles(
  createStyles({
    container: {
      backgroundColor: Colors.White,
      padding: '50px',
      margin: '30px',
      borderRadius: '15px',
      boxShadow: '5px 5px 15px ' + Colors.Grey,
    },
  })
)

export const Home = () => {
  const [hotels, setHotels] = useState<HotelCollectionResponse>()
  const classes = useStyles()
  const { hotels: hotelsReponse, isLoadingHotels } = useBookingImages()
  const { bookedIds } = useBooking()

  useEffect(() => {
    setHotels(hotelsReponse)
  }, [hotelsReponse?.page])

  return (
    <Box className={classes.container}>
      {isLoadingHotels && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {hotels && (
        <BookingList hotelsPhotos={hotels.photos} bookedIds={bookedIds} />
      )}
    </Box>
  )
}
