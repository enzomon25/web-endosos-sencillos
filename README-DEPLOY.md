# Web Endosos Sencillos

Interfaz web para consumir el API de traducción de endosos.

## 🚀 Desarrollo Local

### Prerrequisitos
- Node.js 18+ 
- npm

### Instalación

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

Los archivos de producción estarán en la carpeta `dist/`

## 🌐 Despliegue en AWS Amplify

### Opción 1: Desde la consola de AWS Amplify

1. Ir a la [consola de AWS Amplify](https://console.aws.amazon.com/amplify/)
2. Click en "New app" → "Host web app"
3. Conectar tu repositorio de Git (GitHub, GitLab, Bitbucket, etc.)
4. Seleccionar el repositorio y la rama
5. AWS Amplify detectará automáticamente el `amplify.yml`
6. Configurar las variables de entorno:
   - `VITE_API_URL`: URL del API Gateway
   - `VITE_API_KEY`: Tu API Key (ver en AWS Console)
7. Click en "Save and deploy"

### Opción 2: Usando Amplify CLI

```bash
# Instalar Amplify CLI
npm install -g @aws-amplify/cli

# Configurar Amplify
amplify configure

# Inicializar proyecto
amplify init

# Agregar hosting
amplify add hosting

# Publicar
amplify publish
```

### Variables de Entorno en Amplify

En la consola de Amplify, ve a:
- App settings → Environment variables
- Agregar:
  - `VITE_API_URL`: URL base del API
  - `VITE_API_KEY`: API Key para autenticación

## 📝 Uso

1. Selecciona el **Producto** (Rumbo, VidaProtegida, etc.)
2. Selecciona el **Tipo de Endoso** (CambioFrecuencia, CambioBeneficiario, etc.)
3. Completa los campos comunes (Número de Póliza, ID Envío, Usuario, etc.)
4. Opcionalmente, agrega campos adicionales usando el botón "➕ Agregar Campo"
5. Click en "🚀 Traducir Endoso"
6. La respuesta del API se mostrará en formato JSON

## 🔑 API Endpoint

- **URL**: https://hoae73tgrg.execute-api.us-east-1.amazonaws.com/DESA/endorse/translate
- **Método**: POST
- **Headers**: 
  - `Content-Type: application/json`
  - `x-api-key: YOUR_API_KEY_HERE`

## 🛠️ Tecnologías

- **React** 18
- **TypeScript**
- **Vite** 6
- **AWS Amplify** (para hosting)

## 📦 Estructura del Proyecto

```
web-endosos-sencillos/
├── src/
│   ├── components/
│   │   ├── EndorseForm.tsx       # Formulario dinámico
│   │   └── ResponseDisplay.tsx   # Visualización de respuesta
│   ├── App.tsx                   # Componente principal
│   ├── App.css                   # Estilos de la app
│   ├── index.css                 # Estilos globales
│   └── main.tsx                  # Entry point
├── public/
├── amplify.yml                   # Configuración de build para Amplify
├── .env                          # Variables de entorno (local)
└── package.json
```

## 🔒 Seguridad

⚠️ **Nota**: Las credenciales sensibles deben guardarse en archivos `.env` que están en `.gitignore`. Para producción:
- Usa variables de entorno en Amplify Console
- Considera AWS Secrets Manager para credenciales
- Implementa autenticación con AWS Cognito si es necesario
