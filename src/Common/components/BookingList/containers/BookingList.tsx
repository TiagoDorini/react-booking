import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Rating, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useState } from 'react'
import { Colors } from '../../../enums/Colors'
import { DateSelectDialog } from '../components/DateSelectDialog'
import { Booking } from '../types/Booking'
import { HotelResponse } from '../types/HotelResponse'

interface BookingListProps {
  hotelsPhotos?: HotelResponse[]
  reservations?: Booking[]
  bookedIds?: number[]
}

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: '30px',
    },
    hotelContainer: {
      justifyContent: 'center',
      width: '30%',
      minWidth: '240px',
      maxWidth: '640px',
      height: '360px',
      transition: '250ms',
      borderRadius: '10px',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      '&:hover': {
        boxShadow: '0px 0px 10px ' + Colors.Secondary,
        transition: '250ms',
      },
    },
    hotelImage: {
      width: '100%',
      height: '100%',
      borderRadius: '10px',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      flexShrink: 0,
      objectFit: 'cover',
    },
    hotelImageContainer: {
      width: '100%',
      height: '240px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    hotelBottomSectionContainer: {
      height: '20%',
      padding: '10px',
    },
    hotelTitleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    hotelTitle: {
      fontSize: '20px !important',
      fontWeight: 'bold !important',
      color: Colors.DarkGrey,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    hotelRating: {
      alignItems: 'center',
      color: Colors.DarkGrey,
    },
    hotelDescription: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '80%',
      overflow: 'hidden',
    },
    descriptionContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'end',
    },
  })
)

export const BookingList = ({
  hotelsPhotos,
  reservations,
  bookedIds,
}: BookingListProps) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<HotelResponse>()
  const [selectedBooking, setSelectedBooking] = useState<Booking>()

  const handleOpenDialog = (hotel: HotelResponse) => {
    setSelectedHotel(hotel)
    setOpenDialog(true)
  }

  const handleOpenEditDialog = (booking: Booking) => {
    setSelectedBooking(booking)
    setOpenEditDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
  }

  const handleConfirmDialog = () => {
    setOpenDialog(false)
  }

  const handleConfirmEditDialog = () => {
    setOpenEditDialog(false)
  }

  const handleOnDelete = () => {
    setOpenEditDialog(false)
  }

  return (
    <Box className={classes.container}>
      {!!reservations &&
        reservations.map((reservation) => (
          <Box key={reservation.hotel.id} className={classes.hotelContainer}>
            <Box className={classes.hotelImageContainer}>
              <img
                className={classes.hotelImage}
                src={reservation.hotel.src.medium}
                alt={reservation.hotel.alt}
              />
            </Box>
            <Box className={classes.hotelBottomSectionContainer}>
              <Box className={classes.hotelTitleContainer}>
                <Typography className={classes.hotelTitle}>
                  {reservation.hotel.hotelName}
                </Typography>
                <Rating
                  className={classes.hotelRating}
                  value={reservation.hotel.rating}
                  size="small"
                  precision={0.2}
                  readOnly
                />
              </Box>
              <Box className={classes.descriptionContainer}>
                <Typography className={classes.hotelDescription}>
                  {reservation.hotel.hotelDescription}
                </Typography>
                <Button
                  color="warning"
                  onClick={() => handleOpenEditDialog(reservation)}
                  variant="contained"
                >
                  <EditIcon />
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      {!reservations &&
        !!hotelsPhotos &&
        hotelsPhotos.map(
          (photo) =>
            !bookedIds?.find((id) => id === photo.id) && (
              <Box key={photo.id} className={classes.hotelContainer}>
                <Box className={classes.hotelImageContainer}>
                  <img
                    className={classes.hotelImage}
                    src={photo.src.medium}
                    alt={photo.alt}
                  />
                </Box>
                <Box className={classes.hotelBottomSectionContainer}>
                  <Box className={classes.hotelTitleContainer}>
                    <Typography className={classes.hotelTitle}>
                      {photo.hotelName}
                    </Typography>
                    <Rating
                      className={classes.hotelRating}
                      value={photo.rating}
                      size="small"
                      precision={0.2}
                      readOnly
                    />
                  </Box>
                  <Box className={classes.descriptionContainer}>
                    <Typography className={classes.hotelDescription}>
                      {photo.hotelDescription}
                    </Typography>
                    <Button
                      color="primary"
                      onClick={() => handleOpenDialog(photo)}
                      variant="contained"
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                </Box>
              </Box>
            )
        )}
      <DateSelectDialog
        selectedHotel={selectedHotel}
        onClose={handleCloseDialog}
        onCancel={handleCloseDialog}
        open={openDialog}
        onConfirm={handleConfirmDialog}
      />
      <DateSelectDialog
        selectedBooking={selectedBooking}
        onClose={handleCloseEditDialog}
        onCancel={handleCloseEditDialog}
        onDelete={handleOnDelete}
        isEditing
        open={openEditDialog}
        onConfirm={handleConfirmEditDialog}
      />
    </Box>
  )
}
