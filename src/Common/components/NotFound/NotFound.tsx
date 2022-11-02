import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { Box, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Colors } from '../../enums/Colors'

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '10px',
      alignItems: 'center',
      margin: '30px',
      padding: '30px',
      background: Colors.Light,
      minHeight: '100%',
      height: '100%',
    },
    text: {
      fontSize: '38px !important',
    },
  })
)

export const NotFound = () => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography className={classes.text} color="crimson">
        404 Error
      </Typography>
      <Typography className={classes.text} color="#505050">
        Page Not Foud
      </Typography>
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100, color: 'crimson' }} />
    </Box>
  )
}
