import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>🏥 Evolution - Operaciones</h2>
        </div>
        <div className="nav-links">
          <Link 
            to="/endosos" 
            className={location.pathname === '/endosos' ? 'nav-link active' : 'nav-link'}
          >
            📝 Endosos
          </Link>
          <Link 
            to="/rutas-optimas" 
            className={location.pathname === '/rutas-optimas' ? 'nav-link active' : 'nav-link'}
          >
            🚛 Rutas Óptimas
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
