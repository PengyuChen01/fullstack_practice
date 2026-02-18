import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/index')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setStudents(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch students: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return ''
    // Parse the ISO datetime string directly
    const parts = dateTimeStr.replace('T', ' ')
    return parts + ' UTC'
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading students...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchStudents}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Student Check-ins</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Check-in Time</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty">No students found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{formatDateTime(student.checkInTime)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="footer">
        <p>Total students: {students.length}</p>
      </div>
    </div>
  )
}

export default App
