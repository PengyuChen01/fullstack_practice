import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'

interface Student {
  id: number
  firstName: string
  lastName: string
  checkInTime: string
}

function StudentTable() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    axios.get<Student[]>('/index')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed to fetch students:', err))
  }, [])

  const formatDateTime = (dateTimeStr: string): string => {
    return dateTimeStr.replace('T', ' ') + ' UTC'
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Student Check-ins
      </Typography>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1a1a2e' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check in time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(student => (
              <TableRow
                key={student.id}
                hover
                sx={{ '&:last-child td': { border: 0 } }}
              >
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{formatDateTime(student.checkInTime)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link
        to="/new"
        style={{
          display: 'inline-block',
          marginTop: '16px',
          color: '#213547',
          fontWeight: 500,
          textDecoration: 'underline',
          fontSize: '1rem',
        }}
      >
        New User
      </Link>
    </Container>
  )
}

export default StudentTable
