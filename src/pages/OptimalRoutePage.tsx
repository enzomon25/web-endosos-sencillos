import { useState } from 'react'
import RouteCalculatorForm from '../components/RouteCalculatorForm'
import type { RouteRequest } from '../components/RouteCalculatorForm'
import RouteResultDisplay from '../components/RouteResultDisplay'
import type { RouteResult } from '../components/RouteResultDisplay'
import './OptimalRoutePage.css'

const OptimalRoutePage = () => {
  const [result, setResult] = useState<RouteResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: RouteRequest) => {
    setLoading(true)
    setError(null)
    setResult(null)

    const apiUrl = import.meta.env.VITE_RUTAS_API_URL
    const apiKey = import.meta.env.VITE_RUTAS_API_KEY

    if (!apiUrl || !apiKey) {
      setError('Configuración del API no encontrada. Verifica las variables de entorno VITE_RUTAS_API_URL y VITE_RUTAS_API_KEY.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${apiUrl}/calculate-route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || `Error ${res.status}: ${res.statusText}`)
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al calcular la ruta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="optimal-route-page">
      <header className="page-header">
        <h1>🚛 Calculadora de Rutas Óptimas</h1>
        <p>Sistema de asignación inteligente de grúas usando el algoritmo de Dijkstra</p>
      </header>

      <main className="page-content">
        <RouteCalculatorForm onSubmit={handleSubmit} loading={loading} />
        
        {error && (
          <div className="error-message">
            <div className="error-icon">❌</div>
            <div>
              <h3>Error al Calcular Ruta</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {result && <RouteResultDisplay data={result} />}
      </main>
    </div>
  )
}

export default OptimalRoutePage
