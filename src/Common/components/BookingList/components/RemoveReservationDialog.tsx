import {
    Button,
    Dialog,
    DialogActions,
    DialogProps,
    DialogTitle
} from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useBooking } from '../hooks/useBooking'

interface RemoveReservationDialogProps {
  selectedHotelId?: number
  onClose: DialogProps['onClose']
  open: DialogProps['open']
  onConfirm: () => void
  onCancel: () => void
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
  })
)

export const RemoveReservationDialog = ({
    selectedHotelId,
  onClose,
  open,
  onConfirm,
  onCancel,
}: RemoveReservationDialogProps) => {
  const classes = useStyles()
  const { deleteBooking } = useBooking()
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Please confirm your action</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={() => {
            if (!!selectedHotelId) {
              deleteBooking(selectedHotelId)
            }
            onConfirm()
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
