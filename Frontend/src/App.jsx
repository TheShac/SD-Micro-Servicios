import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Recovery from './pages/Recovery'
import Verification from './pages/Verification'
import Dashboard from './pages/Dashboard'

export default function App(){
  const isLoggedIn = !!localStorage.getItem('user')

  return (
    <div className='min-h-screen flex flex-col bg-black text-gray-200'>

      {/* NAVBAR OSCURO */}
      <nav className='navbar'>
        <div className='max-w-5xl mx-auto px-4 py-3 flex items-center justify-between'>
          <Link to='/' className='text-xl font-bold text-gray-100 hover:text-white transition'>
            SD Micro UI
          </Link>

          <div className='space-x-4 flex items-center'>
            <Link to='/login' className='nav-item'>Login</Link>
            <Link to='/register' className='nav-item'>Register</Link>
            <Link to='/recovery' className='nav-item'>Recovery</Link>
            <Link to='/verification' className='nav-item'>Verify</Link>
            {isLoggedIn && (
              <Link to='/dashboard' className='nav-item'>Dashboard</Link>
            )}
          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className='flex-1 max-w-4xl mx-auto px-4 py-10 w-full'>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/recovery' element={<Recovery/>} />
          <Route path='/verification' element={<Verification/>} />
          <Route path='/dashboard' element={isLoggedIn ? <Dashboard/> : <Navigate to='/login' />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </main>

      {/* FOOTER OSCURO */}
      <footer className='bg-neutral-950 border-t border-neutral-800 py-4'>
        <div className='max-w-4xl mx-auto px-4 text-sm text-center text-gray-500'>
          Built for SD Micro Servicios — frontend scaffold
        </div>
      </footer>

    </div>
  )
}
