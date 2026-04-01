import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StudentTable from './components/StudentTable'
import NewUser from './components/NewUser'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/index" element={<StudentTable />} />
        <Route path="/new" element={<NewUser />} />
        <Route path="*" element={<Navigate to="/index" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App