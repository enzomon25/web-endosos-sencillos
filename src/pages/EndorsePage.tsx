import { useState } from 'react'
import './EndorsePage.css'
import EndorseForm from '../components/EndorseForm'
import ResponseDisplay from '../components/ResponseDisplay'

interface EndorseFormData {
  producto: string
  tipoEndoso: string
}

const EndorsePage = () => {
  const [response, setResponse] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: EndorseFormData) => {
    setLoading(true)
    setError(null)
    setResponse(null)

    const apiUrl = import.meta.env.VITE_ENDOSOS_API_URL
    const apiKey = import.meta.env.VITE_ENDOSOS_API_KEY

    if (!apiUrl || !apiKey) {
      setError('Configuración del API no encontrada. Verifica las variables de entorno.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${apiUrl}/endorse/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="endorse-page">
      <header className="page-header">
        <h1>🏥 Traductor de Endosos</h1>
        <p>Sistema de traducción de endosos para Evolution</p>
      </header>

      <main className="page-content">
        <EndorseForm onSubmit={handleSubmit} loading={loading} />
        
        {error && (
          <div className="error-message">
            <div className="error-icon">❌</div>
            <div>
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {response && <ResponseDisplay data={response} />}
      </main>
    </div>
  )
}

export default EndorsePage
