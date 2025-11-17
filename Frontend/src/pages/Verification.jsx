import { useState } from 'react'
import { API_URL, post } from '../utils/api'
import { motion } from 'framer-motion'

export default function Verification(){
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(1)
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  const handleEmailChange = e => setEmail(e.target.value.trim()); 
  const handleCodeChange = e => setCode(e.target.value.trim());

  async function send(e){
    e.preventDefault(); 
    setMsg('');
    setIsError(false);

    try{
      const data = await post(`${API_URL}/send-verification`, { email })
      setMsg(data.message || 'Código de verificación enviado')
      setStep(2)
    }
    catch(err){
      setIsError(true);
      setMsg(err.data?.message || 'Error al enviar correo')
    }
  }

  async function verify(e){
    e.preventDefault(); 
    setMsg('');
    setIsError(false);

    try{
      const data = await post(`${API_URL}/verify-email`, { email, token: code })
      setMsg(data.message || 'Correo verificado. Redirigiendo a Login...')
    }
    catch(err){
      setIsError(true);
      setMsg(err.data?.message || 'Error al verificar')
    }
  }
    
  const msgClass = isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';

return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Verificación de correo</h2>
      {msg && <div className={`px-3 py-2 rounded mb-3 ${msgClass}`}>{msg}</div>}
      {step===1 ? (
        <form onSubmit={send} className='space-y-3 mt-3'>
          <div>
            <label className='text-sm'>Correo</label>
            <input 
                type='email' 
                required 
                value={email} 
                onChange={handleEmailChange} 
                className='w-full mt-1 p-2 border rounded' 
            />
          </div>
          <div className='flex justify-end'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded'>Enviar código</button>
          </div>
        </form>
      ) : (
        <form onSubmit={verify} className='space-y-3 mt-3'>
          <p className='text-sm text-gray-600'>Ingresa el código de 6 dígitos enviado a: <strong>{email}</strong></p>
          <div>
            <label className='text-sm'>Código de 6 dígitos</label>
            <input 
                required 
                value={code} 
                onChange={handleCodeChange} 
                type="text" 
                maxLength="6"
                inputMode="numeric"
                className='w-full mt-1 p-2 border rounded' 
            />
          </div>
          <div className='flex justify-end'>
            <button className='bg-green-600 text-white px-4 py-2 rounded'>Verificar</button>
          </div>
        </form>
      )}
    </motion.div>
  );
}