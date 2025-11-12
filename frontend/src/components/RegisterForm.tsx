import { useState } from 'react'
import { api } from '../api/client'
import { ENDPOINTS } from '../config'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await api.post(ENDPOINTS.register, { name, email, password })
    setLoading(false)
    setMessage(error ? `Error: ${error}` : 'Registro exitoso')
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Registro</h3>
      <label>
        Nombre
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        Contraseña
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button disabled={loading}>{loading ? 'Registrando...' : 'Crear cuenta'}</button>
      {message && <p className={message.startsWith('Error') ? 'error' : 'success'}>{message}</p>}
    </form>
  )
}

