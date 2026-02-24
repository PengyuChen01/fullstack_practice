import { useState, useEffect, useMemo } from 'react'
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
  Button,
  Box,
  Input,
} from '@mui/material'

interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  major: string
  checkInCount: number
  checkInTime: string
}

function StudentTable() {
  const [students, setStudents] = useState<Student[]>([])
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [search, setSearch] = useState(0)

  
  useEffect(() => {
    axios.get<Student[]>('/index')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed to fetch students:', err))
  }, [])

  const sortedStudents = useMemo(() => {
    if (sortOrder === 'desc') return students
    return [...students].reverse()
  }, [students, sortOrder])

  const formatDateTime = (dateTimeStr: string): string => {
    return dateTimeStr.replace('T', ' ') + ' UTC'
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
        Student Check-ins
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
          sx={{ color: '#1a1a2e', borderColor: '#1a1a2e' }}
        >
          {sortOrder === 'desc' ? 'Sort: Newest First ↓' : 'Sort: Oldest First ↑'}
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1a1a2e' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>First name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Major</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check-ins</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check-in time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStudents.filter(s => s.checkInCount >= search).map(student => (
              <TableRow
                key={student.id}
                hover
                sx={{ '&:last-child td': { border: 0 } }}
              >
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.major}</TableCell>
                <TableCell>{student.checkInCount}</TableCell>
                <TableCell>{formatDateTime(student.checkInTime)}</TableCell>
              </TableRow>
            ))}
        
          </TableBody>
        </Table>
      </TableContainer>
      <Input    

    type= "number"
    sx={{ mt: 2, width: '100%' }}
    value = {search}
    onChange={
        e => setSearch(Number(e.target.value))   
    }


   
  />
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
        New Check-in
      </Link>
    </Container>
  )
}

export default StudentTable
