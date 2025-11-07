import { useState, useEffect } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useProducts, useEndorseTypes } from '../hooks/useApi'

interface EndorseFormData {
  producto: string
  tipoEndoso: string
  [key: string]: string | number
}

interface EndorseFormProps {
  onSubmit: (data: EndorseFormData) => void
  loading: boolean
}

const EndorseForm = ({ onSubmit, loading }: EndorseFormProps) => {
  const { products, loading: loadingProducts } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const { endorseTypes, loading: loadingEndorseTypes } = useEndorseTypes(selectedProduct)
  
  const [formData, setFormData] = useState<EndorseFormData>({
    producto: '',
    tipoEndoso: '',
  })

  useEffect(() => {
    // Limpiar tipo de endoso cuando cambia el producto
    if (formData.producto !== selectedProduct) {
      setFormData(prev => ({ ...prev, tipoEndoso: '' }))
    }
  }, [selectedProduct, formData.producto])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Si cambia el producto, actualizar selectedProduct
    if (name === 'producto') {
      setSelectedProduct(value)
    }
    
    // Validaciones específicas
    if (name === 'policyNumber' && value && !/^\d*$/.test(value)) {
      return // Solo permitir números
    }
    
    if (name === 'idEnvio' && value && !/^\d*$/.test(value)) {
      return // Solo permitir números
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Combinar campos base
    const finalData = { ...formData }
    
    // Convertir idEnvio a número si existe
    if (finalData.idEnvio) {
      finalData.idEnvio = Number(finalData.idEnvio)
    }

    onSubmit(finalData)
  }

  return (
    <form onSubmit={handleSubmit} className="endorse-form">
      <h2>Datos del Endoso</h2>

      <div className="form-group">
        <label htmlFor="producto">Producto *</label>
        <select
          id="producto"
          name="producto"
          value={formData.producto}
          onChange={handleChange}
          required
          disabled={loadingProducts}
        >
          <option value="">
            {loadingProducts ? 'Cargando productos...' : 'Selecciona un producto'}
          </option>
          {products.map(p => (
            <option key={p.idProducto} value={p.nombreProducto}>
              {p.nombreProducto}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tipoEndoso">Tipo de Endoso *</label>
        <select
          id="tipoEndoso"
          name="tipoEndoso"
          value={formData.tipoEndoso}
          onChange={handleChange}
          required
          disabled={!selectedProduct || loadingEndorseTypes}
        >
          <option value="">
            {!selectedProduct 
              ? 'Primero selecciona un producto'
              : loadingEndorseTypes 
              ? 'Cargando tipos de endoso...' 
              : 'Selecciona un tipo'}
          </option>
          {endorseTypes.map(t => (
            <option key={t.idTipoEndoso} value={t.nombreTipoEndoso}>
              {t.nombreTipoEndoso}
            </option>
          ))}
        </select>
      </div>

      {/* Campos comunes */}
      <div className="form-group">
        <label htmlFor="policyNumber">Número de Póliza</label>
        <input
          type="text"
          id="policyNumber"
          name="policyNumber"
          value={formData.policyNumber || ''}
          onChange={handleChange}
          placeholder="08200000049"
          pattern="\d*"
          title="Solo números"
        />
      </div>

      <div className="form-group">
        <label htmlFor="idEnvio">ID Envío</label>
        <input
          type="text"
          id="idEnvio"
          name="idEnvio"
          value={formData.idEnvio || ''}
          onChange={handleChange}
          placeholder="5984"
          pattern="\d*"
          title="Solo números"
        />
      </div>

      <div className="form-group">
        <label htmlFor="usuario">Usuario</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={formData.usuario || ''}
          onChange={handleChange}
          placeholder="interface.servicios"
        />
      </div>

      <div className="form-group">
        <label htmlFor="plan">Plan</label>
        <input
          type="text"
          id="plan"
          name="plan"
          value={formData.plan || ''}
          onChange={handleChange}
          placeholder="PlanRumbo"
        />
      </div>

      <div className="form-group">
        <label htmlFor="moneda">Moneda</label>
        <select
          id="moneda"
          name="moneda"
          value={formData.moneda || ''}
          onChange={handleChange}
        >
          <option value="">Selecciona una moneda</option>
          <option value="Nuevo Sol">Nuevo Sol</option>
          <option value="Dólar Americano">Dólar Americano</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="frecuencia">Frecuencia de Pago</label>
        <select
          id="frecuencia"
          name="frecuencia"
          value={formData.frecuencia || ''}
          onChange={handleChange}
        >
          <option value="">Selecciona una frecuencia</option>
          <option value="Mensual">Mensual</option>
          <option value="Bimestral">Bimestral</option>
          <option value="Trimestral">Trimestral</option>
          <option value="Semestral">Semestral</option>
          <option value="Anual">Anual</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="fechaSolicitud">Fecha Solicitud</label>
        <input
          type="date"
          id="fechaSolicitud"
          name="fechaSolicitud"
          value={formData.fechaSolicitud || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fechaCliente">Fecha Cliente</label>
        <input
          type="date"
          id="fechaCliente"
          name="fechaCliente"
          value={formData.fechaCliente || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fechaEfectiva">Fecha Efectiva</label>
        <input
          type="date"
          id="fechaEfectiva"
          name="fechaEfectiva"
          value={formData.fechaEfectiva || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? '⏳ Enviando...' : '🚀 Traducir Endoso'}
        </button>
      </div>
    </form>
  )
}

export default EndorseForm
