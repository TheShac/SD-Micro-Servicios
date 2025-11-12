import { useState } from 'react'
import { post } from '../utils/api'
import { VERIFICATION_URL } from '../config'
import { motion } from 'framer-motion'

export default function Verification(){
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(1)
  const [msg, setMsg] = useState('')

  async function send(e){
    e.preventDefault(); setMsg('')
    try{
      const data = await post(`${VERIFICATION_URL}/api/send-verification`, { email })
      setMsg(data.message || 'Correo de verificación enviado')
      setStep(2)
    }catch(err){
      setMsg(err.data?.message || 'Error al enviar correo')
    }
  }

  async function verify(e){
    e.preventDefault(); setMsg('')
    try{
      const data = await post(`${VERIFICATION_URL}/api/verify-email`, { email, token: code })
      setMsg(data.message || 'Correo verificado')
    }catch(err){
      setMsg(err.data?.message || 'Error al verificar')
    }
  }

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Verificación de correo</h2>
      {msg && <div className='px-3 py-2 rounded mb-3'>{msg}</div>}
      {step===1 ? (
        <form onSubmit={send} className='space-y-3 mt-3'>
          <div>
            <label className='text-sm'>Correo</label>
            <input type='email' required value={email} onChange={e=>setEmail(e.target.value)} className='w-full mt-1 p-2 border rounded' />
          </div>
          <div className='flex justify-end'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded'>Enviar código</button>
          </div>
        </form>
      ) : (
        <form onSubmit={verify} className='space-y-3 mt-3'>
          <div>
            <label className='text-sm'>Código</label>
            <input required value={code} onChange={e=>setCode(e.target.value)} className='w-full mt-1 p-2 border rounded' />
          </div>
          <div className='flex justify-end'>
            <button className='bg-green-600 text-white px-4 py-2 rounded'>Verificar</button>
          </div>
        </form>
      )}
    </motion.div>
  );
}

