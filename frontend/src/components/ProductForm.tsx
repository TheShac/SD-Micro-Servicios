import { useState } from 'react'
import { api } from '../api/client'
import { ENDPOINTS } from '../config'

export default function ProductForm() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await api.post(ENDPOINTS.product, { name, price: Number(price) })
    setLoading(false)
    setMessage(error ? `Error: ${error}` : 'Producto registrado')
    if (!error) {
      setName('')
      setPrice('')
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Registrar producto (servicio adicional)</h3>
      <label>
        Nombre del producto
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Precio
        <input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))} required />
      </label>
      <button disabled={loading}>{loading ? 'Enviando...' : 'Registrar'}</button>
      {message && <p className={message.startsWith('Error') ? 'error' : 'success'}>{message}</p>}
      <p className="hint">El middleware manejará el failover al servicio espejo si fuera necesario.</p>
    </form>
  )
}

