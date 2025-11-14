import { useState } from 'react'
import { post } from '../utils/api'
import { API_URL } from '../utils/api'
import { motion } from 'framer-motion'

export default function Register(){
  const [form, setForm] = useState({ nombre:'', apellido:'', username:'', correo:'', password:'' })
  const [msg, setMsg] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  async function submit(e){
    e.preventDefault()
    setMsg('')
    try{
      const data = await post(`${API_URL}/register`, form)
      setMsg(data.message || 'Registro exitoso. Revisa tu correo.')
    }catch(err){
      setMsg(err.data?.message || 'Error al registrar')
    }
  }

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Registro</h2>
      {msg && <div className='bg-green-100 text-green-800 px-3 py-2 rounded mb-3'>{msg}</div>}
      <form onSubmit={submit} className='space-y-3 mt-3'>
        <div>
          <label className='text-sm'>Nombre</label>
          <input name='nombre' required value={form.nombre} onChange={handleChange} className='w-full mt-1 p-2 border rounded' />
        </div>
        <div>
          <label className='text-sm'>Apellido</label>
          <input name='apellido' required value={form.apellido} onChange={handleChange} className='w-full mt-1 p-2 border rounded' />
        </div>
        <div>
          <label className='text-sm'>Username</label>
          <input name='username' required value={form.username} onChange={handleChange} className='w-full mt-1 p-2 border rounded' />
        </div>
        <div>
            <label className='text-sm'>Correo</label>
            <input type='email' name='correo' required value={form.correo} onChange={handleChange} className='w-full mt-1 p-2 border rounded' />
        </div>
        <div>
            <label className='text-sm'>Contraseña</label>
            <input type='password' name='password' required value={form.password} onChange={handleChange} className='w-full mt-1 p-2 border rounded' />
        </div>
        <div className='flex items-center justify-between'>
          <button className='bg-green-600 text-white px-4 py-2 rounded'>Crear cuenta</button>
          <a className='text-sm' href='/login'>¿Ya tienes cuenta?</a>
        </div>
      </form>
    </motion.div>
  );
}

