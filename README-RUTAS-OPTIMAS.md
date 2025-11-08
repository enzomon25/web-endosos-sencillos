# 🚛 Frontend - Rutas Óptimas

## Nuevo Módulo Agregado

Se ha integrado un nuevo módulo de **Rutas Óptimas** en la aplicación web existente de Endosos Sencillos.

## 🎯 Características

- ✅ **Navegación entre módulos**: Sistema de routing con React Router
- ✅ **Calculadora de rutas**: Interfaz para configurar accidentes y depósitos
- ✅ **Escenarios predefinidos**: Lima Básico (6 distritos) y Lima Complejo (12 distritos)
- ✅ **Visualización interactiva**: Muestra ruta óptima con path completo
- ✅ **Integración con API**: Conectado al servicio Go/Lambda de rutas óptimas
- ✅ **Diseño responsivo**: Funciona en mobile, tablet y desktop
- ✅ **Validación de formularios**: Manejo robusto de errores

## 📁 Estructura Agregada

```
web-endosos-sencillos/
├── src/
│   ├── pages/                           # ← NUEVO
│   │   ├── EndorsePage.tsx              # Página de Endosos
│   │   ├── EndorsePage.css
│   │   ├── OptimalRoutePage.tsx         # Página de Rutas Óptimas
│   │   └── OptimalRoutePage.css
│   ├── components/
│   │   ├── Navigation.tsx               # ← NUEVO - Menú de navegación
│   │   ├── Navigation.css
│   │   ├── RouteCalculatorForm.tsx      # ← NUEVO - Formulario de rutas
│   │   ├── RouteCalculatorForm.css
│   │   ├── RouteResultDisplay.tsx       # ← NUEVO - Resultado visual
│   │   ├── RouteResultDisplay.css
│   │   ├── EndorseForm.tsx              # (ya existía)
│   │   └── ResponseDisplay.tsx          # (ya existía)
│   ├── App.tsx                          # Modificado: Router
│   ├── App.css                          # Simplificado
│   └── index.css                        # Actualizado: colores
└── .env                                 # Modificado: nuevas vars
```

## 🚀 Configuración

### 1. Variables de Entorno

Edita `.env` y agrega las credenciales del API de Rutas Óptimas:

```bash
# Rutas Óptimas API
VITE_RUTAS_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/DESA
VITE_RUTAS_API_KEY=tu-api-key-aqui
```

### 2. Obtener API URL y Key

Desde el proyecto `rutas-optimas-api`:

```bash
cd ../rutas-optimas-api

# Obtener URL del endpoint
npx serverless info --stage DESA

# Obtener API Key
make get-api-key
# O manualmente:
aws apigateway get-api-keys --include-values --profile eolorteg_aws
```

## 🏃‍♂️ Ejecución

```bash
# Instalar dependencias (si es primera vez)
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build
```

## 🌐 Rutas Disponibles

| Ruta | Módulo | Descripción |
|------|--------|-------------|
| `/` | Redirect | Redirige a `/endosos` |
| `/endosos` | Endosos | Traductor de endosos (módulo original) |
| `/rutas-optimas` | Rutas Óptimas | Calculadora de rutas para grúas |

## 🎨 Componentes Nuevos

### `<Navigation />`
Barra de navegación superior con:
- Logo de Evolution
- Links a `/endosos` y `/rutas-optimas`
- Indicador de ruta activa
- Responsive para mobile

### `<RouteCalculatorForm />`
Formulario interactivo que permite:
- Seleccionar escenarios predefinidos (Lima Básico/Complejo)
- Ingresar ubicación del accidente
- Definir múltiples depósitos
- Configurar grafo de rutas en JSON
- Validación de formato JSON

### `<RouteResultDisplay />`
Visualización de resultados con:
- Tarjetas informativas (depósito, destino, distancia)
- Path visual con nodos conectados
- Animaciones de entrada
- Indicadores de inicio/fin de ruta

## 📊 Escenarios Predefinidos

### Lima - Básico
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

### Lima - Complejo
12 distritos interconectados con múltiples rutas alternativas.

## 🔧 Deploy a AWS Amplify

La aplicación está configurada con `amplify.yml` existente. Simplemente:

1. Asegúrate de agregar las variables de entorno en Amplify Console:
   ```
   VITE_RUTAS_API_URL
   VITE_RUTAS_API_KEY
   ```

2. Push a tu rama y Amplify desplegará automáticamente:
   ```bash
   git add .
   git commit -m "feat: agregar módulo de rutas óptimas"
   git push
   ```

## 🔍 Troubleshooting

### Error: "Cannot GET /rutas-optimas" en producción

Amplify está configurado para SPA. Verifica `amplify.yml`:

```yaml
customHeaders:
  - pattern: '**'
    headers:
      - key: 'Cache-Control'
        value: 'no-cache'
```

Y agrega regla de rewrite:
```yaml
- source: '/<*>'
  target: '/index.html'
  status: '200'
```

### API Key no funciona

Verifica que las variables estén correctamente configuradas en Amplify Console:
- Settings → Environment variables
- Agregar `VITE_RUTAS_API_URL` y `VITE_RUTAS_API_KEY`
- Rebuild la aplicación

## 📝 Siguiente Pasos

- [ ] Agregar visualización gráfica del grafo (D3.js o Cytoscape.js)
- [ ] Implementar drag-and-drop para construir grafos
- [ ] Agregar mapa interactivo con Google Maps/Mapbox
- [ ] Caché de rutas calculadas en LocalStorage
- [ ] Export de resultados a PDF
- [ ] Modo comparación de rutas (Dijkstra vs otros algoritmos)

## 📄 Licencia

Este proyecto es parte de la iniciativa Evolution del SQUAD de Operaciones.

---

Desarrollado con ❤️ para el SQUAD de Operaciones - Interseguros
