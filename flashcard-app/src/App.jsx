
import './App.css'
import FlashcardApp from './components/FlashCards'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import Admin from './components/Admin'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlashcardApp />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </Router>
  )
}

export default App
