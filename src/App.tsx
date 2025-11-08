import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import EndorsePage from './pages/EndorsePage'
import OptimalRoutePage from './pages/OptimalRoutePage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/endosos" replace />} />
          <Route path="/endosos" element={<EndorsePage />} />
          <Route path="/rutas-optimas" element={<OptimalRoutePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
