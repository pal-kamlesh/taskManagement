// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import { AuthProvider } from "./context/AuthContext.jsx"

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App