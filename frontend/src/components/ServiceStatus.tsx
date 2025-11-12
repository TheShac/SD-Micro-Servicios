import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { ENDPOINTS } from '../config'

export default function ServiceStatus() {
  const [status, setStatus] = useState<'ok' | 'down' | 'unknown'>('unknown')

  useEffect(() => {
    let mounted = true
    const check = async () => {
      const { error } = await api.get(ENDPOINTS.health)
      if (!mounted) return
      setStatus(error ? 'down' : 'ok')
    }
    check()
    const id = setInterval(check, 5000)
    return () => { mounted = false; clearInterval(id) }
  }, [])

  return (
    <div className={`status ${status}`}>
      <span className="dot" />
      {status === 'ok' && 'Servicios en línea'}
      {status === 'down' && 'Servicios no disponibles'}
      {status === 'unknown' && 'Comprobando servicios...'}
    </div>
  )
}

