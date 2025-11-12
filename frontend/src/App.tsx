import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()

  return (
    <div className="container">
      <header className="header">
        <h1>Aplicación de Microservicios</h1>
        <nav>
          <Link className={pathname === '/' ? 'active' : ''} to="/">Inicio</Link>
          <Link className={pathname.startsWith('/dashboard') ? 'active' : ''} to="/dashboard">Panel</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <small>Frontend React • Middleware como API única</small>
      </footer>
    </div>
  )
}

