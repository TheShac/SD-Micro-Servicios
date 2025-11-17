import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post, API_URL } from '../utils/api'
import { motion } from 'framer-motion'

export default function Login(){
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setMsg('')
    try{
      const data = await post(`${API_URL}/login`, { identifier, password })
      
      localStorage.setItem('user', data.user ? JSON.stringify(data.user) : identifier)
      navigate('/dashboard')
    }catch(err){
      setMsg(err.data?.message || 'Error al iniciar sesión')
    }
  }

  return (
    <motion.div
      initial={{ opacity:0, y:8 }}
      animate={{ opacity:1, y:0 }}
      className='card max-w-md mx-auto'
    >
      <h2 className='text-2xl font-semibold mb-4 text-gray-100'>Iniciar sesión</h2>

      {msg && (
        <div className='bg-red-900/30 text-red-300 px-3 py-2 rounded mb-3 border border-red-700'>
          {msg}
        </div>
      )}

      <form onSubmit={submit} className='space-y-4 mt-3'>

        <div>
          <label className='text-sm text-gray-400'>
            Correo electrónico o Nombre de usuario
          </label>
          <input
            required
            value={identifier}
            onChange={e=>setIdentifier(e.target.value)}
            className='input w-full mt-1'
            placeholder='Email / Username'
          />
        </div>

        <div>
          <label className='text-sm text-gray-400'>Contraseña</label>
          <input
            type='password'
            required
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className='input w-full mt-1'
          />
        </div>

        <div className='flex items-center justify-between pt-2'>
          <button className='btn-primary'>
            Entrar
          </button>

          <a
            className='text-sm text-gray-400 hover:text-gray-200 transition'
            href='/recovery'
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

      </form>
    </motion.div>
  );
}
