import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Recovery from './pages/Recovery'
import Verification from './pages/Verification'
import Dashboard from './pages/Dashboard'

export default function App(){
  const isLoggedIn = !!localStorage.getItem('user')

  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-5xl mx-auto px-4 py-3 flex items-center justify-between'>
          <Link to='/' className='font-bold text-xl'>SD Micro UI</Link>
          <div className='space-x-3'>
            <Link to='/login' className='text-sm'>Login</Link>
            <Link to='/register' className='text-sm'>Register</Link>
            <Link to='/recovery' className='text-sm'>Recovery</Link>
            <Link to='/verification' className='text-sm'>Verify</Link>
            {isLoggedIn && <Link to='/dashboard' className='text-sm'>Dashboard</Link>}
          </div>
        </div>
      </nav>

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

      <footer className='bg-white border-t py-4'>
        <div className='max-w-4xl mx-auto px-4 text-sm text-center'>Built for SD Micro Servicios — frontend scaffold</div>
      </footer>
    </div>
  )
}
