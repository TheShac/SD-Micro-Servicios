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
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Iniciar sesión</h2>
      {msg && <div className='bg-red-100 text-red-800 px-3 py-2 rounded mb-3'>{msg}</div>}
      <form onSubmit={submit} className='space-y-3 mt-3'>
        <div>
          <label className='text-sm'>Correo electronico o Nombre de usuario</label>
          <input required value={identifier} onChange={e=>setIdentifier(e.target.value)} className='w-full mt-1 p-2 border rounded' placeholder='Email/Username
          ' />
        </div>
        <div>
          <label className='text-sm'>Contraseña</label>
          <input type='password' required value={password} onChange={e=>setPassword(e.target.value)} className='w-full mt-1 p-2 border rounded' />
        </div>
        <div className='flex items-center justify-between'>
          <button className='bg-blue-600 text-white px-4 py-2 rounded'>Entrar</button>
          <a className='text-sm' href='/recovery'>¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </motion.div>
  );
}
