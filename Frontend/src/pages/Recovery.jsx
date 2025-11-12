import { useState } from 'react'
import { post } from '../utils/api'
import { RECOVERY_URL } from '../config'
import { motion } from 'framer-motion'

export default function Recovery(){
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState(1)
  const [msg, setMsg] = useState('')

  async function sendForgot(e){
    e.preventDefault(); setMsg('')
    try{
      const data = await post(`${RECOVERY_URL}/api/forgot-password`, { email })
      setMsg(data.message || 'Si existe, se envió correo con instrucciones')
      setStep(2)
    }catch(err){
      setMsg(err.data?.message || 'Error al enviar correo')
    }
  }

  async function doReset(e){
    e.preventDefault(); setMsg('')
    try{
      const data = await post(`${RECOVERY_URL}/api/reset-password`, { token, password: newPassword })
      setMsg(data.message || 'Contraseña actualizada')
      setStep(1)
    }catch(err){
      setMsg(err.data?.message || 'Error al restablecer contraseña')
    }
  }

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Recuperar contraseña</h2>
      {msg && <div className='px-3 py-2 rounded mb-3'>{msg}</div>}
      {step===1 ? (
        <form onSubmit={sendForgot} className='space-y-3 mt-3'>
          <div>
            <label className='text-sm'>Correo</label>
            <input type='email' required value={email} onChange={e=>setEmail(e.target.value)} className='w-full mt-1 p-2 border rounded' />
          </div>
          <div className='flex justify-end'>
            <button className='bg-yellow-600 text-white px-4 py-2 rounded'>Enviar enlace</button>
          </div>
        </form>
      ) : (
        <form onSubmit={doReset} className='space-y-3 mt-3'>
          <div>
            <label className='text-sm'>Token</label>
            <input required value={token} onChange={e=>setToken(e.target.value)} className='w-full mt-1 p-2 border rounded' />
          </div>
          <div>
            <label className='text-sm'>Nueva contraseña</label>
            <input type='password' required value={newPassword} onChange={e=>setNewPassword(e.target.value)} className='w-full mt-1 p-2 border rounded' />
          </div>
          <div className='flex justify-end'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded'>Restablecer</button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
export default Recovery;    
