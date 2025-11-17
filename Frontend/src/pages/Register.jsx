import { useState } from 'react'
import { post, API_URL } from '../utils/api'
import { motion } from 'framer-motion'

export default function Register(){
  const [form, setForm] = useState({ nombre:'', apellido:'', username:'', email:'', password:'' })
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  async function submit(e){
    e.preventDefault()
    setMsg('')
    setIsError(false)
    try{
      const data = await post(`${API_URL}/register`, form)
      setMsg(data.message || 'Registro exitoso.')
    }catch(err){
      setIsError(true)
      setMsg(err.data?.message || 'Error al registrar')
    }
  }

  return (
    <motion.div
      initial={{opacity:0,y:8}}
      animate={{opacity:1,y:0}}
      className='card max-w-md mx-auto'
    >
      <h2 className='text-2xl font-semibold mb-4 text-gray-100'>
        Registro
      </h2>

      {msg && (
        <div
          className={`px-3 py-2 rounded mb-3 border ${
            isError
              ? 'bg-red-900/30 text-red-300 border-red-700'
              : 'bg-green-900/20 text-green-300 border-green-700'
          }`}
        >
          {msg}
        </div>
      )}

      <form onSubmit={submit} className='space-y-4 mt-3'>
        
        <div>
          <label className='text-sm text-gray-400'>Nombre</label>
          <input
            name='nombre'
            required
            value={form.nombre}
            onChange={handleChange}
            className='input w-full mt-1'
          />
        </div>

        <div>
          <label className='text-sm text-gray-400'>Apellido</label>
          <input
            name='apellido'
            required
            value={form.apellido}
            onChange={handleChange}
            className='input w-full mt-1'
          />
        </div>

        <div>
          <label className='text-sm text-gray-400'>Username</label>
          <input
            name='username'
            required
            value={form.username}
            onChange={handleChange}
            className='input w-full mt-1'
          />
        </div>

        <div>
          <label className='text-sm text-gray-400'>Correo</label>
          <input
            type='email'
            name='email'
            required
            value={form.email}
            onChange={handleChange}
            className='input w-full mt-1'
          />
        </div>

        <div>
          <label className='text-sm text-gray-400'>Contraseña</label>
          <input
            type='password'
            name='password'
            required
            value={form.password}
            onChange={handleChange}
            className='input w-full mt-1'
          />
        </div>

        <div className='flex items-center justify-between pt-2'>
          <button className='btn-primary'>
            Crear cuenta
          </button>

          <a
            href='/login'
            className='text-sm text-gray-400 hover:text-gray-200 transition'
          >
            ¿Ya tienes cuenta?
          </a>
        </div>

      </form>
    </motion.div>
  )
}
