import { useState } from 'react'
import ProductForm from '../components/ProductForm'
import ServiceStatus from '../components/ServiceStatus'

export default function Dashboard() {
  const [logged, setLogged] = useState(true) // Simplificado: asume sesión local tras login básico

  return (
    <div className="stack">
      <h2>Panel</h2>
      {!logged && <p>Inicia sesión para acceder a las funciones.</p>}
      {logged && (
        <>
          <ServiceStatus />
          <ProductForm />
        </>
      )}
    </div>
  )
}

