import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material'

interface MajorsResponse {
  majors: { name: string }[]
}

function NewUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [major, setMajor] = useState('')
  const [majors, setMajors] = useState<string[]>([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<MajorsResponse>('/majors')
      .then(res => setMajors(res.data.majors.map(m => m.name)))
      .catch(err => console.error('Failed to fetch majors:', err))
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // frontend .edu validation
    if (!email.endsWith('.edu')) {
      setError('Email must be a valid .edu address')
      return
    }

    try {
      await axios.post('/new', {
        firstName,
        lastName,
        email,
        major,
      })
      navigate('/index')
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || 'Failed to check in')
      } else {
        setError('Failed to check in')
      }
      console.error('Failed to check in:', err)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Student Check-in
      </Typography>

      <Paper elevation={2} sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
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
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            helperText="Must be a valid .edu email address"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth required sx={{ mb: 3 }}>
            <InputLabel>Major</InputLabel>
            <Select
              value={major}
              label="Major"
              onChange={e => setMajor(e.target.value)}
            >
              {majors.map(m => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#1a1a2e' }}>
              Check In
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
