import { useState } from 'react'
import './RouteCalculatorForm.css'

interface RouteCalculatorFormProps {
  onSubmit: (data: RouteRequest) => void
  loading: boolean
}

export interface RouteRequest {
  accidentLocation: string
  depots: string[]
  graph: Record<string, Record<string, number>>
}

const RouteCalculatorForm = ({ onSubmit, loading }: RouteCalculatorFormProps) => {
  const [accidentLocation, setAccidentLocation] = useState('')
  const [depots, setDepots] = useState('')
  const [graphJson, setGraphJson] = useState('')
  const [usePreset, setUsePreset] = useState('custom')

  const presets: Record<string, RouteRequest> = {
    lima_basic: {
      accidentLocation: 'San Isidro',
      depots: ['Miraflores', 'Ate'],
      graph: {
        'Miraflores': { 'San Isidro': 7, 'Barranco': 3 },
        'San Isidro': { 'Miraflores': 7, 'Lince': 4 },
        'Barranco': { 'Miraflores': 3, 'Surco': 5 },
        'Lince': { 'San Isidro': 4, 'Surco': 6 },
        'Surco': { 'Barranco': 5, 'Lince': 6, 'Ate': 10 },
        'Ate': { 'Surco': 10 }
      }
    },
    lima_complex: {
      accidentLocation: 'Pueblo Libre',
      depots: ['Miraflores', 'San Isidro', 'Ate'],
      graph: {
        'Miraflores': { 'Barranco': 3, 'San Isidro': 7, 'Surco': 8 },
        'Barranco': { 'Miraflores': 3, 'Surco': 5, 'Chorrillos': 4 },
        'San Isidro': { 'Miraflores': 7, 'Lince': 4, 'Jesus Maria': 3 },
        'Surco': { 'Miraflores': 8, 'Barranco': 5, 'Lince': 6, 'La Molina': 7, 'Ate': 10 },
        'Lince': { 'San Isidro': 4, 'Surco': 6, 'Jesus Maria': 2, 'Pueblo Libre': 5 },
        'Jesus Maria': { 'San Isidro': 3, 'Lince': 2, 'Pueblo Libre': 3, 'Magdalena': 4 },
        'Pueblo Libre': { 'Lince': 5, 'Jesus Maria': 3, 'Magdalena': 2, 'San Miguel': 4 },
        'Magdalena': { 'Jesus Maria': 4, 'Pueblo Libre': 2, 'San Miguel': 2 },
        'San Miguel': { 'Pueblo Libre': 4, 'Magdalena': 2 },
        'Chorrillos': { 'Barranco': 4 },
        'La Molina': { 'Surco': 7, 'Ate': 6 },
        'Ate': { 'Surco': 10, 'La Molina': 6 }
      }
    }
  }

  const handlePresetChange = (preset: string) => {
    setUsePreset(preset)
    if (preset !== 'custom' && presets[preset]) {
      const data = presets[preset]
      setAccidentLocation(data.accidentLocation)
      setDepots(data.depots.join(', '))
      setGraphJson(JSON.stringify(data.graph, null, 2))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const graph = graphJson ? JSON.parse(graphJson) : {}
      const depotsList = depots.split(',').map(d => d.trim()).filter(d => d)
      
      onSubmit({
        accidentLocation: accidentLocation.trim(),
        depots: depotsList,
        graph
      })
    } catch {
      alert('Error en formato JSON del grafo. Verifica la sintaxis.')
    }
  }

  return (
    <form className="route-calculator-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>📍 Configuración del Escenario</h3>
        
        <div className="form-group">
          <label htmlFor="preset">Escenario predefinido:</label>
          <select
            id="preset"
            value={usePreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="form-control"
          >
            <option value="custom">Personalizado</option>
            <option value="lima_basic">Lima - Básico (6 distritos)</option>
            <option value="lima_complex">Lima - Complejo (12 distritos)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="accidentLocation">Ubicación del accidente: *</label>
          <input
            type="text"
            id="accidentLocation"
            value={accidentLocation}
            onChange={(e) => setAccidentLocation(e.target.value)}
            placeholder="Ej: San Isidro"
            className="form-control"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="depots">Depósitos de grúas (separados por coma): *</label>
          <input
            type="text"
            id="depots"
            value={depots}
            onChange={(e) => setDepots(e.target.value)}
            placeholder="Ej: Miraflores, Ate, San Isidro"
            className="form-control"
            required
            disabled={loading}
          />
          <small>Ingresa los nombres de los depósitos separados por comas</small>
        </div>
      </div>

      <div className="form-section">
        <h3>🗺️ Grafo de Rutas (JSON)</h3>
        <div className="form-group">
          <label htmlFor="graph">Definición del grafo:</label>
          <textarea
            id="graph"
            value={graphJson}
            onChange={(e) => setGraphJson(e.target.value)}
            placeholder={`{
  "Miraflores": { "San Isidro": 7, "Barranco": 3 },
  "San Isidro": { "Miraflores": 7, "Lince": 4 }
}`}
            className="form-control graph-textarea"
            rows={12}
            disabled={loading}
          />
          <small>Formato: {`{ "origen": { "destino": distancia } }`}</small>
        </div>
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? '🔄 Calculando ruta...' : '🚀 Calcular Ruta Óptima'}
      </button>
    </form>
  )
}

export default RouteCalculatorForm
