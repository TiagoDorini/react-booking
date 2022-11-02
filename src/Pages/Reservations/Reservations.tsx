import { createStyles, makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import { BookingList } from '../../Common/components/BookingList/containers/BookingList'
import { useBooking } from '../../Common/components/BookingList/hooks/useBooking'
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

interface ReservationsProps {}

export const Reservations = ({}: ReservationsProps) => {
  const classes = useStyles()
  const { userReservations } = useBooking()
  return (
    <Box className={classes.container}>
      {!userReservations.length && (
        <Box> Please add a hotel to your reservations!</Box>
      )}
      {!!userReservations.length && (
        <BookingList reservations={userReservations} />
      )}
    </Box>
  )
}
