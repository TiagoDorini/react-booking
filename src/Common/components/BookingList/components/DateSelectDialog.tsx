import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { format, parse } from 'date-fns'
import { FormEvent, useEffect, useState } from 'react'
import { useBooking } from '../hooks/useBooking'
import { Booking } from '../types/Booking'
import { HotelResponse } from '../types/HotelResponse'

interface DateSelectDialogProps {
  selectedHotel?: HotelResponse
  selectedBooking?: Booking
  onClose: DialogProps['onClose']
  open: DialogProps['open']
  onConfirm: () => void
  onDelete?: () => void
  onCancel: () => void
  isEditing?: boolean
}

const useStyles = makeStyles(
  createStyles({
    container: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      justifyContent: 'space-around',
    },
    dialogTitleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItem: 'center',
    },
  })
)

export const DateSelectDialog = ({
  selectedHotel,
  selectedBooking,
  onClose,
  open,
  onConfirm,
  onCancel,
  isEditing,
  onDelete,
}: DateSelectDialogProps) => {
  const classes = useStyles()
  const [minStartDate, setMinStartDate] = useState<Date>(new Date())
  const [minEndDate, setMinEndDate] = useState<Date | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isValid, setIsValid] = useState<boolean>(false)

  const { addBooking, editBooking, deleteBooking } = useBooking()

  const configMinStartDate = () => {
    setMinStartDate((date) => {
      date.setDate(minStartDate.getDate() - 1)
      return date
    })
  }

  const configMinEndDate = () => {
    if (!!startDate) {
      setMinEndDate(() => {
        const newDate = new Date()
        newDate.setDate(startDate.getDate() + 1)
        return newDate
      })
    }
  }

  const mapSelectedBooking = (selectedBooking?: Booking) => {
    if (!!selectedBooking) {
      setEndDate(parse(selectedBooking.endDate, 'MM/dd/yyyy', new Date()))
      setStartDate(parse(selectedBooking.startDate, 'MM/dd/yyyy', new Date()))
    }
  }

  const resetDialog = () => {
    setStartDate(null)
    setEndDate(null)
    setMinStartDate(new Date())
    setMinEndDate(null)
  }

  useEffect(() => {
    console.log('aqui')
    resetDialog()
    mapSelectedBooking(selectedBooking)
    configMinStartDate()
  }, [selectedHotel?.id, selectedBooking?.hotel.id])

  useEffect(() => {
    console.log('aqui 1')
    configMinEndDate()
  }, [startDate])

  useEffect(() => {
    console.log('aqui 2')
    setIsValid(!!startDate && !!endDate)
  }, [startDate, endDate])

  const handleSubmit = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault()
    if (isValid) {
      if (!isEditing) {
        if (!!selectedHotel) {
          addBooking({
            hotel: selectedHotel,
            endDate: format(endDate || new Date(), 'MM/dd/yyyy'),
            startDate: format(startDate || new Date(), 'MM/dd/yyyy'),
          })
        }
      }
      if (isEditing) {
        if (!!selectedBooking) {
          editBooking({
            hotel: selectedBooking.hotel,
            endDate: format(endDate || new Date(), 'MM/dd/yyyy'),
            startDate: format(startDate || new Date(), 'MM/dd/yyyy'),
          })
        }
      }
    }
    onConfirm()
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle className={classes.dialogTitleContainer}>
        <Typography alignSelf={'center'} fontSize={'18px'}>
          {!isEditing ? 'Pick the dates' : 'Edit the dates'}
        </Typography>
        {isEditing && (
          <Tooltip title="Remove">
            <IconButton
              onClick={() => {
                if (selectedBooking) {
                  deleteBooking(selectedBooking?.hotel.id)
                }
                if (!!onDelete) onDelete()
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <Box className={classes.container}>
          <MobileDatePicker
            label={'Start date'}
            value={startDate}
            minDate={new Date()}
            onChange={(newValue) => {
              setEndDate(null)
              setStartDate(newValue)
            }}
            renderInput={(params) => (
              <TextField name="startDate" required size={'small'} {...params} />
            )}
          />
          <Typography>To</Typography>
          <MobileDatePicker
            label={'End date'}
            value={endDate}
            minDate={minEndDate}
            onChange={(newValue) => {
              setEndDate(newValue)
            }}
            disabled={!startDate}
            renderInput={(params) => (
              <TextField name="endDate" required size={'small'} {...params} />
            )}
          />
        </Box>
        <DialogActions>
          <Button
            onClick={() => {
              onCancel()
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button disabled={!isValid} type="submit" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
