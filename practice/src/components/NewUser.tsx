import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material'

function NewUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('/new', {
        firstName,
        lastName,
      })
      navigate('/index')
    } catch (err) {
      console.error('Failed to create student:', err)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        New User
      </Typography>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            fullWidth
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#1a1a2e' }}>
              Submit
            </Button>
            <Link
              to="/index"
              style={{
                color: '#213547',
                textDecoration: 'underline',
                fontSize: '1rem',
              }}
            >
              Back
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default NewUser
