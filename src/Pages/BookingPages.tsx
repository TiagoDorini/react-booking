import { Box } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import { Route, Routes } from 'react-router-dom'
import { NavbarRoute } from '../Common/components/Navbar/NavbarRoute'
import { NotFound } from '../Common/components/NotFound/NotFound'
import { RouteTypes } from '../Common/types/RouteTypes'
import { Home } from './Home/Home'
import { Reservations } from './Reservations/Reservations'

const routes: RouteTypes[] = [
  {
    label: 'Home',
    path: '/',
    component: <Home />,
  },
  {
    label: 'Reservations',
    path: '/reservations',
    component: <Reservations />,
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {},
  })
)

interface BookingPagesProps {}

export const BookingPages = ({}: BookingPagesProps) => {
  const classes = useStyles()
  return (
    <Box>
      <NavbarRoute routes={routes} />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </Box>
  )
}
