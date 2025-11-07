interface ResponseDisplayProps {
  data: Record<string, unknown>
}

const ResponseDisplay = ({ data }: ResponseDisplayProps) => {
  return (
    <div className="response-display">
      <h2>✅ Respuesta del API</h2>
      <pre className="json-display">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default ResponseDisplay
