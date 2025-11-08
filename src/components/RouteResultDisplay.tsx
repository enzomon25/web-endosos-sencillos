import './RouteResultDisplay.css'

interface RouteResultDisplayProps {
  data: RouteResult | null
}

export interface RouteResult {
  fromDepot: string
  to: string
  path: string[]
  distance: number
}

const RouteResultDisplay = ({ data }: RouteResultDisplayProps) => {
  if (!data) return null

  return (
    <div className="route-result">
      <div className="result-header">
        <h2>✅ Ruta Óptima Encontrada</h2>
      </div>

      <div className="result-grid">
        <div className="result-card">
          <div className="result-icon">🏢</div>
          <div className="result-content">
            <div className="result-label">Depósito Seleccionado</div>
            <div className="result-value">{data.fromDepot}</div>
          </div>
        </div>

        <div className="result-card">
          <div className="result-icon">🚨</div>
          <div className="result-content">
            <div className="result-label">Destino (Accidente)</div>
            <div className="result-value">{data.to}</div>
          </div>
        </div>

        <div className="result-card highlight">
          <div className="result-icon">📏</div>
          <div className="result-content">
            <div className="result-label">Distancia Total</div>
            <div className="result-value distance">{data.distance} km</div>
          </div>
        </div>
      </div>

      <div className="route-path">
        <h3>🗺️ Ruta Detallada</h3>
        <div className="path-visualization">
          {data.path.map((location, index) => (
            <div key={index} className="path-step">
              <div className={`path-node ${index === 0 ? 'start' : index === data.path.length - 1 ? 'end' : ''}`}>
                <div className="node-number">{index + 1}</div>
                <div className="node-name">{location}</div>
              </div>
              {index < data.path.length - 1 && (
                <div className="path-arrow">
                  <span>→</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="path-summary">
          <strong>Total de paradas:</strong> {data.path.length}
        </div>
      </div>
    </div>
  )
}

export default RouteResultDisplay
