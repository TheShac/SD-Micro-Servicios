import { useState, useEffect } from 'react'
import { post, API_URL } from '../utils/api'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Recovery(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const urlToken = searchParams.get('token');
    
    const [email, setEmail] = useState('')
    const [token, setToken] = useState(urlToken || '')
    const [newPassword, setNewPassword] = useState('')
    const [step, setStep] = useState(urlToken ? 2 : 1)
    const [msg, setMsg] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (urlToken) {
            setMsg('Token de restablecimiento detectado. Introduce tu nueva contraseña.');
            setIsError(false);
        }
    }, [urlToken]);

    async function sendForgot(e){
        e.preventDefault(); 
        setMsg('');
        setIsError(false);
        
        try{
            const data = await post(`${API_URL}/forgot-password`, { email })
            setMsg(data.message || 'Si existe, se envió correo con instrucciones')
        }
        catch(err){
            setIsError(true);
            setMsg(err.data?.message || 'Error al enviar correo')
        }
    }

    async function doReset(e){
        e.preventDefault(); 
        setMsg('');
        setIsError(false);

        if (!token) {
            setIsError(true);
            setMsg('Error crítico: Token no detectado. Vuelve a solicitar el enlace.');
            return;
        }
        
        try{
            const data = await post(`${API_URL}/reset-password`, { token, newPassword })
            setMsg(data.message || 'Contraseña actualizada. Puedes iniciar sesión.')
            navigate('/login');
        }
        catch(err){
            setIsError(true);
            setMsg(err.data?.message || 'Error al restablecer contraseña')
        }
    }

    const msgClass = isError 
        ? 'bg-red-900/30 text-red-300 border border-red-700'
        : 'bg-green-900/20 text-green-300 border border-green-700';

    return (
        <motion.div
            initial={{opacity:0,y:8}}
            animate={{opacity:1,y:0}}
            className='card max-w-md mx-auto'
        >
            <h2 className='text-2xl font-semibold mb-4 text-gray-100'>
                Recuperar contraseña
            </h2>
            
            {msg && (
                <div className={`px-3 py-2 rounded mb-3 ${msgClass}`}>
                    {msg}
                </div>
            )}
            
            {step===1 ? (
                <form onSubmit={sendForgot} className='space-y-4 mt-3'>
                    <div>
                        <label className='text-sm text-gray-400'>Correo</label>
                        <input
                            type='email'
                            required
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            className='input w-full mt-1'
                        />
                    </div>

                    <div className='flex justify-end pt-2'>
                        <button className='btn-primary'>
                            Enviar enlace
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={doReset} className='space-y-4 mt-3'>
                    <div>
                        <label className='text-sm text-gray-400'>Token detectado</label>
                        <input 
                            value={token.substring(0, 10) + '...'}
                            disabled
                            className='w-full mt-1 bg-neutral-800 border border-neutral-700 text-gray-400 cursor-not-allowed rounded-xl p-2 text-sm'
                        />
                    </div>

                    <div>
                        <label className='text-sm text-gray-400'>Nueva contraseña</label>
                        <input
                            type='password'
                            required
                            value={newPassword}
                            onChange={e=>setNewPassword(e.target.value)}
                            className='input w-full mt-1'
                        />
                    </div>

                    <div className='flex justify-end pt-2'>
                        <button className='btn-primary'>
                            Restablecer
                        </button>
                    </div>
                </form>
            )}
        </motion.div>
    );
}
