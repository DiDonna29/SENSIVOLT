# ⚡ SENSIVOLT | Pro-Grade FPS Sensitivity Converter

Sensivolt es una herramienta de utilidad de alto rendimiento diseñada para jugadores competitivos de FPS tácticos. Permite convertir la sensibilidad del ratón entre diferentes motores de juego de manera instantánea, manteniendo la memoria muscular intacta al cambiar de juego.

## 🚀 Características Principales

- **Conversión en Tiempo Real:** Sin botones de "Calcular". Los resultados aparecen mientras escribes.
- **Métricas Avanzadas:** Cálculo automático de **eDPI** (DPI Efectivo) y **cm/360** (distancia física por giro completo).
- **Estética Esports:** Interfaz agresiva diseñada con inspiración en el gaming profesional (skew-elements, high contrast, typography).
- **Dark/Light Mode:** Implementación nativa con variables CSS (HSL) para el máximo confort visual.
- **Internacionalización (i18n):** Soporte bilingüe completo (ES/EN).
- **Mobile First:** UI totalmente responsiva que asegura que los números nunca desborden su contenedor.

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Fuentes:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)

## 🎯 Lógica de Cálculo

La aplicación utiliza un sistema de **multiplicadores base** referenciados al motor de juego *Source* (CS:GO/CS2).

1.  **Conversión de Sensibilidad:**
    - `Sensibilidad_Base = Sensibilidad_Entrada * Multiplicador_Origen`
    - `Sensibilidad_Final = Sensibilidad_Base / Multiplicador_Destino`
2.  **eDPI:** `Sensibilidad * DPI`
3.  **cm/360:** Basado en la fórmula estándar de rotación de 360 grados considerando el `m_yaw` (0.022) y el multiplicador del motor gráfico.

## 📦 Instalación y Desarrollo

Este proyecto es compatible con los gestores de paquetes más populares.

### Requisitos Previos
- Node.js 18.x o superior.

### Usando NPM
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Usando PNPM (Recomendado)
```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build
```

### Usando Yarn
```bash
# Instalar dependencias
yarn install

# Iniciar servidor de desarrollo
yarn dev

# Construir para producción
yarn build
```

## 🏗️ Estructura del Proyecto

- `/src/app/lib/game-data.ts`: Contiene los multiplicadores de los motores y las fórmulas matemáticas.
- `/src/app/lib/translations.ts`: Diccionario de internacionalización.
- `/src/components/SensitivityConverter.tsx`: Núcleo de la aplicación con lógica reactiva.
- `/src/app/globals.css`: Configuración del tema (colores HSL).

## 🔮 Futuro y Escalabilidad

Sensivolt está diseñado para crecer. Los siguientes pasos para evolucionar la aplicación incluyen:

1.  **API de Multipliers:** Migrar las constantes de `game-data.ts` a un backend (Firebase/Supabase) para actualizar fórmulas de juegos nuevos sin necesidad de desplegar código.
2.  **Perfiles de Usuario:** Permitir a los jugadores guardar sus configuraciones de sensibilidad en la nube.
3.  **Gráficos de Rendimiento:** Visualización comparativa de sensibilidades entre pro-players conocidos.
4.  **Soporte para Juegos con "Filtros":** Implementar cálculos complejos para juegos con aceleración de ratón o multiplicadores de ADS (Aim Down Sights).
5.  **Detección de Hardware:** Integración con APIs de controladores para detectar el DPI actual del ratón automáticamente.

---
**Sensivolt** - Built for the Pro Performance Utility.