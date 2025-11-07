# Web Endosos Sencillos

Interfaz web para traducir endosos de seguros a formato estándar utilizando configuración dinámica desde base de datos.

## 📋 Descripción

Esta aplicación web permite a los usuarios:
- Seleccionar productos de seguros (Rumbo, VidaProtegida, etc.)
- Elegir tipos de endoso específicos por producto (CambioFrecuencia, CambioBeneficiario, etc.)
- Completar formularios dinámicos con validación
- Enviar datos al API de traducción de endosos
- Visualizar la respuesta JSON transformada

Los catálogos de productos y tipos de endoso se cargan dinámicamente desde la base de datos a través del API backend.

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
VITE_API_URL=https://hoae73tgrg.execute-api.us-east-1.amazonaws.com/DESA
VITE_API_KEY=tu-api-key-aqui
```

**Importante:** El archivo `.env` está en `.gitignore` y NO debe subirse al repositorio. Usa `.env.example` como referencia.

### Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
npm run preview  # Para previsualizar el build
```

## 🔗 API Backend

El frontend consume los siguientes endpoints del backend:

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

## 🌐 Despliegue en AWS Amplify

### Opción 1: Desde AWS Console (Recomendado)

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click en "New app" → "Host web app"
3. Conecta tu repositorio Git (GitHub, GitLab, Bitbucket)
4. Selecciona el repositorio `web-endosos-sencillos` y la rama `main`
5. AWS Amplify detectará automáticamente el `amplify.yml`
6. **Configura las variables de entorno en Build settings:**
   - `VITE_API_URL`: URL del API Gateway
   - `VITE_API_KEY`: API Key del backend
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

**Importante:** En ambos casos, asegúrate de configurar las variables de entorno `VITE_API_URL` y `VITE_API_KEY` en la consola de Amplify.

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
- React 18
- TypeScript
- Vite 6
- Custom Hooks para consumo de API
- Django-inspired UI (light theme)

**Backend:**
- Hapi.js 21
- Node.js 20.x
- TypeScript
- AWS Lambda + API Gateway
- MySQL (RDS)
- Serverless Framework

## 📦 Estructura del Proyecto

```
web-endosos-sencillos/
├── src/
│   ├── components/
│   │   ├── EndorseForm.tsx       # Formulario dinámico
│   │   └── ResponseDisplay.tsx   # Visualización JSON
│   ├── hooks/
│   │   └── useApi.ts             # Custom hooks para API
│   ├── App.tsx                   # Componente principal
│   ├── App.css                   # Estilos Django theme
│   ├── index.css                 # Estilos globales
│   └── main.tsx                  # Entry point
├── public/
├── amplify.yml                   # Config Amplify CI/CD
├── .env                          # Variables de entorno (no subir)
├── .env.example                  # Plantilla de .env
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

## 📄 Licencia

Este proyecto es privado y de uso interno.

## 👤 Autor

Enzo Olórtegui

