import { useState } from 'react'
import { api } from '../api/client'
import { ENDPOINTS } from '../config'

type Props = { onSuccess?: () => void }

export default function LoginForm({ onSuccess }: Props) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await api.post(ENDPOINTS.login, { user, password })
    setLoading(false)
    if (error) setMessage(`Error: ${error}`)
    else {
      setMessage('Inicio de sesión correcto')
      onSuccess?.()
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Inicio de sesión</h3>
      <label>
        Usuario o email
        <input value={user} onChange={e => setUser(e.target.value)} required />
      </label>
      <label>
        Contraseña
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</button>
      {message && <p className={message.startsWith('Error') ? 'error' : 'success'}>{message}</p>}
    </form>
  )
}

