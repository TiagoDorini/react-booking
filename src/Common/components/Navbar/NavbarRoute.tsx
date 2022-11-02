import { Stack, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { Colors } from '../../enums/Colors'

interface Routes {
  label: string
  path: string
  component: React.ReactNode
}

interface NavbarRouteProps {
  routes: Routes[]
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    container: {
      zIndex: 1,
      position: 'sticky',
      top: 0,
      width: 'auto',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: '30px',
      paddingLeft: '30px',
      paddingRight: '30px',
      backgroundColor: Colors.Primary,
      height: '80px',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      height: '100%',
      paddingLeft: '30px',
      paddingRight: '30px',
      color: Colors.Light,
      fontSize: '1.2em',
      fontWeight: 'bold',
      transition: '250ms',
      '&:hover': {
        background: Colors.Secondary,
        transition: '250ms',
      },
    },
    selected: {
      background: Colors.Secondary,
    },
  })
)

export const NavbarRoute = (props: NavbarRouteProps) => {
  const { routes } = props
  const { pathname } = useLocation()
  const classes = useStyles()

  return (
    <Stack className={classes.container} direction="row">
      {routes.map((route) => (
        <Link
          key={route.path}
          className={clsx(
            classes.item,
            pathname === route.path ? classes.selected : ''
          )}
          to={route.path}
        >
          {route.label}
        </Link>
      ))}
    </Stack>
  )
}
