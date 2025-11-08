# 🏥 Web Evolution - Operaciones

Plataforma web unificada para los servicios de operaciones del SQUAD Evolution.

## 📋 Descripción

Esta aplicación integra múltiples módulos para optimizar las operaciones de seguros:

### 🔹 Módulo de Endosos Sencillos
- Seleccionar productos de seguros (Rumbo, VidaProtegida, etc.)
- Elegir tipos de endoso específicos por producto
- Completar formularios dinámicos con validación
- Enviar datos al API de traducción de endosos
- Visualizar respuesta JSON transformada
- Catálogos dinámicos desde base de datos

### 🔹 Módulo de Rutas Óptimas (NUEVO)
- Calculadora de rutas para asignación de grúas
- Algoritmo de Dijkstra para encontrar camino más corto
- Soporte para múltiples depósitos
- Escenarios predefinidos (Lima Básico/Complejo)
- Editor de grafos en formato JSON
- Visualización interactiva de rutas calculadas
- Integración con API Go/Lambda

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Acceso al API backend desplegado o corriendo localmente

### Instalación

```bash
npm install
```

### Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
# Endosos Sencillos API
VITE_ENDOSOS_API_URL=https://tu-endpoint.execute-api.us-east-1.amazonaws.com/DESA
VITE_ENDOSOS_API_KEY=tu-api-key-endosos-aqui

# Rutas Óptimas API
VITE_RUTAS_API_URL=https://tu-endpoint.execute-api.us-east-1.amazonaws.com/DESA
VITE_RUTAS_API_KEY=tu-api-key-rutas-aqui
```

**Importante:** 
- El archivo `.env` está en `.gitignore` y NO debe subirse al repositorio
- Solicita las API Keys reales al equipo de DevOps o revisa AWS API Gateway
- NUNCA expongas las API Keys en el código o documentación pública

### Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

**Rutas disponibles:**
- `/` - Redirige a `/endosos`
- `/endosos` - Módulo de Traducción de Endosos
- `/rutas-optimas` - Módulo de Calculadora de Rutas Óptimas

### Build para Producción

```bash
npm run build
npm run preview  # Para previsualizar el build
```

## 🔗 APIs Backend

El frontend consume endpoints de dos APIs independientes:

### API Endosos Sencillos
**Base URL:** `https://<tu-endpoint>.execute-api.us-east-1.amazonaws.com/DESA`  
**Header requerido:** `x-api-key: <tu-api-key>`

### GET /products
Obtiene la lista de productos activos.

**Response:**
```json
[
  {
    "idProducto": 1,
    "nombreProducto": "Rumbo"
  }
]
```

### GET /products/{productName}/endorse-types
Obtiene los tipos de endoso disponibles para un producto.

**Response:**
```json
[
  {
    "idTipoEndoso": 1,
    "nombreTipoEndoso": "CambioFrecuencia",
    "descripcion": "Cambio de frecuencia de pago"
  }
]
```

### POST /endorse/translate
Traduce un endoso al formato estándar.

**Request:**
```json
{
  "producto": "Rumbo",
  "tipoEndoso": "CambioFrecuencia",
  "policyNumber": "12345",
  "idEnvio": 67890,
  "usuario": "admin",
  "plan": "Plan Básico",
  "moneda": "Nuevo Sol",
  "frecuencia": "Mensual",
  "fechaSolicitud": "2024-01-15",
  "fechaCliente": "2024-01-16",
  "fechaEfectiva": "2024-02-01"
}
```

---

### API Rutas Óptimas
**Base URL:** `https://<tu-endpoint>.execute-api.us-east-1.amazonaws.com/DESA`  
**Header requerido:** `x-api-key: <tu-api-key>`

### POST /calculate-route
Calcula la ruta óptima desde depósitos hasta ubicación del accidente usando Dijkstra.

**Request:**
```json
{
  "accidentLocation": "San Isidro",
  "depots": ["Miraflores", "Ate"],
  "graph": {
    "Miraflores": { "San Isidro": 7, "Barranco": 3 },
    "San Isidro": { "Miraflores": 7, "Lince": 4 },
    "Barranco": { "Miraflores": 3, "Surco": 5 },
    "Lince": { "San Isidro": 4, "Surco": 6 },
    "Surco": { "Barranco": 5, "Lince": 6, "Ate": 10 },
    "Ate": { "Surco": 10 }
  }
}
```

**Response:**
```json
{
  "fromDepot": "Miraflores",
  "to": "San Isidro",
  "path": ["Miraflores", "San Isidro"],
  "distance": 7
}
```

## 🌐 Despliegue en AWS Amplify

### Opción 1: Desde AWS Console (Recomendado)

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click en "New app" → "Host web app"
3. Conecta tu repositorio Git (GitHub, GitLab, Bitbucket)
4. Selecciona el repositorio `web-endosos-sencillos` y la rama `main`
5. AWS Amplify detectará automáticamente el `amplify.yml`
6. **Configura las variables de entorno en Build settings:**
   - `VITE_ENDOSOS_API_URL`: URL del API de Endosos
   - `VITE_ENDOSOS_API_KEY`: API Key de Endosos
   - `VITE_RUTAS_API_URL`: URL del API de Rutas Óptimas
   - `VITE_RUTAS_API_KEY`: API Key de Rutas Óptimas
7. Click en "Save and deploy"

### Opción 2: Con Amplify CLI

```bash
# Instalar Amplify CLI
npm install -g @aws-amplify/cli

# Configurar credenciales AWS
amplify configure

# Inicializar proyecto
amplify init

# Agregar hosting
amplify add hosting

# Desplegar
amplify publish
```

**Importante:** En ambos casos, asegúrate de configurar las 4 variables de entorno (`VITE_ENDOSOS_API_URL`, `VITE_ENDOSOS_API_KEY`, `VITE_RUTAS_API_URL`, `VITE_RUTAS_API_KEY`) en la consola de Amplify.

## 🔧 Despliegue del API Backend

El API backend debe estar desplegado antes de usar el frontend. Para desplegar el backend:

### Prerrequisitos Backend
- AWS CLI configurado con credenciales válidas
- Node.js 20.x
- Serverless Framework 3.x

### Pasos para Desplegar el Backend

1. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto backend:

```env
DB_HOST=tu-host-rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=tu-password
DB_NAME=endosos_sencillos
DB_PORT=3306
```

**⚠️ Importante:** El archivo `.env` NO se sube al repositorio. Está en `.gitignore`.

2. **Instalar dependencias**

```bash
cd endosos-sencillos-api
npm install
```

3. **Desplegar a AWS Lambda**

```bash
npm run deploy
```

Este comando:
- Ejecuta `npm run build` (compila con esbuild)
- Despliega a AWS Lambda en región `us-east-1`, stage `DESA`
- Crea/actualiza el API Gateway con la API Key
- Inyecta las variables de entorno del `.env` al Lambda

4. **Obtener la API Key**

Después del despliegue, obtén la API Key desde AWS Console:
- Ve a API Gateway → API Keys
- Copia el valor de `endosos-api-key-DESA`
- Úsalo en el `.env` del frontend

## 🛠️ Tecnologías

**Frontend:**
- React 19.1
- TypeScript
- Vite 7.2
- React Router DOM 7 (navegación entre módulos)
- Custom Hooks para consumo de API
- Django-inspired UI (light theme - verde esmeralda)

**Backend APIs:**

*Endosos Sencillos:*
- Hapi.js 21
- Node.js 20.x
- TypeScript
- AWS Lambda + API Gateway
- MySQL (RDS)
- Serverless Framework

*Rutas Óptimas:*
- Go 1.21+
- Algoritmo de Dijkstra
- Clean Architecture (SOLID)
- AWS Lambda (ARM64)
- API Gateway con API Keys
- Serverless Framework

## 📦 Estructura del Proyecto

```
web-endosos-sencillos/
├── src/
│   ├── pages/                            # ← NUEVO
│   │   ├── EndorsePage.tsx               # Página de Endosos
│   │   ├── EndorsePage.css
│   │   ├── OptimalRoutePage.tsx          # Página de Rutas Óptimas
│   │   └── OptimalRoutePage.css
│   ├── components/
│   │   ├── Navigation.tsx                # ← NUEVO - Barra navegación
│   │   ├── Navigation.css
│   │   ├── RouteCalculatorForm.tsx       # ← NUEVO - Formulario rutas
│   │   ├── RouteCalculatorForm.css
│   │   ├── RouteResultDisplay.tsx        # ← NUEVO - Visualización rutas
│   │   ├── RouteResultDisplay.css
│   │   ├── EndorseForm.tsx               # Formulario de endosos
│   │   └── ResponseDisplay.tsx           # Visualización JSON
│   ├── hooks/
│   │   └── useApi.ts                     # Custom hooks para API
│   ├── App.tsx                           # Router principal
│   ├── App.css                           # Estilos base
│   ├── index.css                         # Estilos globales Django theme
│   └── main.tsx                          # Entry point
├── public/
├── amplify.yml                           # Config Amplify CI/CD
├── .env                                  # Variables de entorno (no subir)
├── README.md                             # Este archivo
├── README-RUTAS-OPTIMAS.md               # Doc específica rutas
├── .gitignore
└── package.json
```

## 🔒 Seguridad

- ✅ Las credenciales están en archivos `.env` que NO se suben al repositorio
- ✅ El `.gitignore` protege archivos sensibles
- ✅ El API Key se pasa como header `x-api-key` en las peticiones
- ✅ AWS API Gateway aplica rate limiting automático
- ✅ CORS configurado para permitir solo orígenes específicos en producción

**Nota:** El API Key es visible en el código del navegador (común en SPAs). Para mayor seguridad en producción, considera:
- Implementar autenticación con AWS Cognito
- Usar un backend proxy que maneje las credenciales
- Aplicar IP whitelisting en API Gateway

## 📝 Scripts Disponibles

```bash
npm run dev        # Desarrollo local con hot reload
npm run build      # Build de producción
npm run preview    # Preview del build
npm run lint       # Linting con ESLint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🎨 Diseño

La aplicación utiliza el esquema de colores de Django Framework (versión light):
- **Verde oscuro principal:** `#0C4B33`
- **Verde esmeralda:** `#44B78B`
- **Tema:** Light con degradados suaves
- **Componentes:** Modernos, con animaciones y transiciones

## 📚 Documentación Adicional

- [README-RUTAS-OPTIMAS.md](./README-RUTAS-OPTIMAS.md) - Documentación detallada del módulo de rutas óptimas
- [README-DEPLOY.md](./README-DEPLOY.md) - Guía de deployment en AWS Amplify

## 🔄 Historial de Cambios

### v2.0.0 (Noviembre 2025)
- ✨ Agregado módulo de Rutas Óptimas
- ✨ Implementado React Router para navegación
- ✨ Nuevo componente Navigation
- 🎨 Actualizado diseño a Django theme (verde esmeralda)
- 🔧 Separación de variables de entorno por API
- � Documentación completa actualizada

### v1.0.0
- 🎉 Versión inicial con módulo de Endosos Sencillos

## �📄 Licencia

Este proyecto es privado y de uso interno del SQUAD de Operaciones - Evolution.

## � Equipo

**SQUAD de Operaciones - Interseguros**  
Iniciativa Evolution - Atención de Siniestros

