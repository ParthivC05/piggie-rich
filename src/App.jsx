import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameRoomPage from './pages/GameRoomPage'

function App() {
  return (
    <div className='bg-black'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game-room" element={<GameRoomPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App