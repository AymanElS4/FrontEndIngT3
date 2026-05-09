# 📐 Documentación de Diseño CSS - TechMarket

## Introducción

Este proyecto utiliza **Tailwind CSS v4** como framework principal de estilos. Tailwind es un framework de utilidades CSS que permite escribir estilos directamente en las clases HTML sin necesidad de archivos CSS tradicionales.

## 📁 Estructura de Archivos

```
/docs/
├── design-system.css              # Sistema de diseño completo con variables y componentes
├── tailwind-to-css-mapping.md     # Mapeo de clases Tailwind a CSS tradicional
└── component-styles-guide.md      # Guía de estilos específicos por componente

/styles/
└── globals.css                    # Estilos globales y variables CSS del proyecto
```

## 🎨 Sistema de Diseño

### Filosofía de Diseño

TechMarket sigue un diseño inspirado en el **framework Yii PHP** y **Bootstrap**, caracterizado por:

- ✅ **Paneles con bordes claros** - Uso de `border: 1px solid #d1d5db`
- ✅ **Headers separados** - Bordes inferiores en encabezados de paneles
- ✅ **Tablas con filas alternadas** - Mejor legibilidad (striped rows)
- ✅ **Botones con estados claros** - Colores diferenciados por acción
- ✅ **Formularios estructurados** - Labels claros y validación visible

### Paleta de Colores

#### Colores Principales

| Color | Hex | Uso |
|-------|-----|-----|
| **Azul Primario** | `#2563eb` | Enlaces, botones primarios |
| **Verde Éxito** | `#16a34a` | Precios, estados activos, botones de crear |
| **Amarillo** | `#facc15` | Estrellas de calificación |
| **Rojo Error** | `#dc2626` | Errores, campos requeridos |
| **Gris Texto** | `#374151` | Texto principal |
| **Gris Borde** | `#d1d5db` | Bordes estándar |

#### Colores de Fondo

| Color | Hex | Uso |
|-------|-----|-----|
| **Blanco** | `#ffffff` | Paneles, cards |
| **Gris Muy Claro** | `#f9fafb` | Fondos alternos, headers de tabla |
| **Gris Claro** | `#f3f4f6` | Fondo de página |

## 🔧 Cómo Usar Esta Documentación

### 1. Si usas Tailwind CSS (Recomendado)

Continúa usando las clases de Tailwind directamente en tus componentes:

```tsx
<div className="bg-white border border-gray-300 rounded p-4">
  <h2 className="text-lg text-gray-800 mb-2">Título</h2>
  <p className="text-sm text-gray-600">Contenido</p>
</div>
```

### 2. Si necesitas CSS Tradicional

Consulta el archivo `tailwind-to-css-mapping.md` para convertir las clases de Tailwind a CSS tradicional:

**Tailwind:**
```html
<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
  Botón
</button>
```

**CSS Tradicional:**
```css
.btn-primary {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 0.25rem;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}
```

### 3. Si necesitas personalizar un componente específico

Consulta `component-styles-guide.md` para ver los estilos detallados de cada componente con comentarios explicativos.

## 📦 Archivos de Documentación

### 1. `design-system.css`

**Qué contiene:**
- Variables CSS globales
- Clases de componentes completas
- Sistema de colores documentado
- Componentes de formulario
- Sistema de tablas
- Sistema de calificación por estrellas

**Cuándo usar:**
- Cuando necesites migrar a CSS tradicional
- Para entender la estructura completa del diseño
- Como referencia de variables y colores

**Ejemplo de uso:**
```css
/* Copiar del archivo design-system.css */
.btn-primary {
  padding: 0.5rem 1rem;
  background-color: var(--color-blue-600);
  color: #ffffff;
  border-radius: 0.25rem;
}
```

### 2. `tailwind-to-css-mapping.md`

**Qué contiene:**
- Mapeo directo de cada clase Tailwind a CSS
- Tabla de escala de espaciado
- Guía de breakpoints responsive
- Ejemplos prácticos

**Cuándo usar:**
- Cuando necesites convertir clases Tailwind a CSS
- Para aprender cómo funciona Tailwind
- Como referencia rápida de conversión

**Ejemplo:**
```
Tailwind: text-sm
CSS: font-size: 0.875rem; /* 14px */
```

### 3. `component-styles-guide.md`

**Qué contiene:**
- Estilos CSS específicos para cada componente
- Comentarios explicativos detallados
- Código listo para copiar
- Variantes y estados

**Cuándo usar:**
- Para replicar un componente específico
- Para entender cómo está diseñado cada elemento
- Como referencia para crear nuevos componentes

## 🎯 Componentes Principales

### Header
```css
/* Fondo blanco con borde inferior grueso */
background-color: #ffffff;
border-bottom: 2px solid #d1d5db;
```

### Paneles/Cards
```css
/* Estilo Yii con bordes claros */
background-color: #ffffff;
border: 1px solid #d1d5db;
border-radius: 0.25rem;
```

### Botones

**Primario (Azul):**
```css
background-color: #2563eb;
color: #ffffff;
```

**Éxito (Verde):**
```css
background-color: #16a34a;
color: #ffffff;
```

**Secundario (Gris):**
```css
background-color: #d1d5db;
color: #374151;
```

### Formularios

**Input:**
```css
border: 1px solid #d1d5db;
padding: 0.5rem 0.75rem;
border-radius: 0.25rem;
```

**Input con error:**
```css
border-color: #ef4444; /* Rojo */
```

### Tablas (Estilo Yii GridView)

```css
/* Header gris claro */
thead {
  background-color: #f9fafb;
}

/* Filas alternadas */
tbody tr:nth-child(even) {
  background-color: #f9fafb;
}
```

### Sistema de Calificación

**Estrella llena:**
```css
fill: #facc15; /* Amarillo */
color: #facc15;
```

**Estrella vacía:**
```css
fill: #e5e7eb; /* Gris */
color: #e5e7eb;
```

## 📱 Responsive Design

### Breakpoints

| Nombre | Ancho Mínimo | Uso |
|--------|--------------|-----|
| `sm` | 640px | Móviles grandes |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Pantallas grandes |

### Ejemplo de Grid Responsive

```css
/* Mobile: 1 columna */
.product-grid {
  grid-template-columns: repeat(1, 1fr);
}

/* Tablet: 2 columnas */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 4 columnas */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🚀 Mejores Prácticas

### 1. Consistencia en Espaciado

Utiliza la escala de Tailwind para mantener consistencia:
- `gap-2` = 8px
- `gap-4` = 16px
- `gap-6` = 24px

### 2. Colores Semánticos

- **Azul** → Acciones primarias, enlaces
- **Verde** → Éxito, precios, crear
- **Amarillo** → Calificaciones, advertencias suaves
- **Rojo** → Errores, acciones destructivas
- **Gris** → Acciones secundarias, cancelar

### 3. Jerarquía Visual

```css
/* Títulos principales */
font-size: 1.5rem; /* text-2xl */

/* Títulos de sección */
font-size: 1.125rem; /* text-lg */

/* Texto normal */
font-size: 0.875rem; /* text-sm */

/* Texto pequeño (meta) */
font-size: 0.75rem; /* text-xs */
```

### 4. Estados Interactivos

Siempre incluir estados hover para elementos clickeables:

```css
.button {
  transition: background-color 0.15s;
}

.button:hover {
  background-color: /* color más oscuro */;
}
```

## 🔍 Recursos Adicionales

### Documentación de Tailwind CSS
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/v4-beta)

### Herramientas Útiles
- [Tailwind Color Shades Generator](https://www.tailwindshades.com/)
- [Tailwind Component Library](https://tailwindui.com/)

## ❓ Preguntas Frecuentes

### ¿Puedo usar CSS tradicional en vez de Tailwind?

Sí, puedes copiar las clases del archivo `design-system.css` y usarlas como CSS tradicional.

### ¿Cómo personalizo los colores?

Modifica las variables en `/styles/globals.css`:

```css
:root {
  --color-blue-600: #TU_COLOR_AQUÍ;
}
```

### ¿Cómo agrego un nuevo componente?

1. Diseña usando clases de Tailwind
2. Documenta en `component-styles-guide.md`
3. Si es reutilizable, crea una clase en `design-system.css`

### ¿Por qué algunos elementos usan `text-sm` en vez de tamaños por defecto?

Para mantener consistencia con el diseño Yii, preferimos tamaños de texto más pequeños y compactos.

## 📝 Notas Finales

- Este diseño está optimizado para aplicaciones web tipo "marketplace"
- El estilo Yii prioriza la funcionalidad sobre la estética moderna
- Los bordes y estructuras claras mejoran la usabilidad
- El sistema es completamente responsive

---

**Última actualización:** Enero 2026  
**Versión:** 1.0  
**Autor:** TechMarket Development Team
