import { Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

function Navbar() {
  const location = useLocation()

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1a1a2e' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Kiosk
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/index"
            sx={{
              color: location.pathname === '/index' ? '#fff' : 'rgba(255,255,255,0.7)',
              fontWeight: location.pathname === '/index' ? 700 : 400,
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/new"
            sx={{
              color: location.pathname === '/new' ? '#fff' : 'rgba(255,255,255,0.7)',
              fontWeight: location.pathname === '/new' ? 700 : 400,
            }}
          >
            New Check-in
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
