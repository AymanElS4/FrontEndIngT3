# Mapeo de Clases Tailwind a CSS Tradicional

Este documento explica cómo las clases de Tailwind CSS utilizadas en TechMarket se traducen a CSS tradicional.

## 📋 Tabla de Contenidos

1. [Espaciado y Layout](#espaciado-y-layout)
2. [Tipografía](#tipografía)
3. [Colores](#colores)
4. [Bordes y Sombras](#bordes-y-sombras)
5. [Flexbox y Grid](#flexbox-y-grid)
6. [Interactividad](#interactividad)

---

## Espaciado y Layout

### Padding (Relleno Interno)

```css
/* Tailwind: p-4 */
padding: 1rem; /* 16px */

/* Tailwind: px-3 py-2 */
padding-left: 0.75rem;   /* 12px */
padding-right: 0.75rem;  /* 12px */
padding-top: 0.5rem;     /* 8px */
padding-bottom: 0.5rem;  /* 8px */

/* Tailwind: p-6 */
padding: 1.5rem; /* 24px */
```

### Margin (Margen Externo)

```css
/* Tailwind: mb-4 */
margin-bottom: 1rem; /* 16px */

/* Tailwind: mr-2 */
margin-right: 0.5rem; /* 8px */

/* Tailwind: mt-8 */
margin-top: 2rem; /* 32px */
```

### Width (Ancho)

```css
/* Tailwind: w-full */
width: 100%;

/* Tailwind: w-1/2 */
width: 50%;

/* Tailwind: w-4 (para iconos) */
width: 1rem; /* 16px */

/* Tailwind: w-24 */
width: 6rem; /* 96px */

/* Tailwind: max-w-7xl */
max-width: 80rem; /* 1280px */
```

### Height (Altura)

```css
/* Tailwind: h-16 */
height: 4rem; /* 64px */

/* Tailwind: h-4 */
height: 1rem; /* 16px */

/* Tailwind: min-h-screen */
min-height: 100vh;
```

---

## Tipografía

### Tamaños de Texto

```css
/* Tailwind: text-xs */
font-size: 0.75rem;   /* 12px */
line-height: 1rem;

/* Tailwind: text-sm */
font-size: 0.875rem;  /* 14px */
line-height: 1.25rem;

/* Tailwind: text-base */
font-size: 1rem;      /* 16px */
line-height: 1.5rem;

/* Tailwind: text-lg */
font-size: 1.125rem;  /* 18px */
line-height: 1.75rem;

/* Tailwind: text-xl */
font-size: 1.25rem;   /* 20px */
line-height: 1.75rem;

/* Tailwind: text-2xl */
font-size: 1.5rem;    /* 24px */
line-height: 2rem;

/* Tailwind: text-3xl */
font-size: 1.875rem;  /* 30px */
line-height: 2.25rem;
```

### Peso de Fuente

```css
/* Tailwind: font-normal */
font-weight: 400;

/* Tailwind: font-medium */
font-weight: 500;

/* Tailwind: font-bold */
font-weight: 700;
```

---

## Colores

### Colores de Texto

```css
/* Tailwind: text-gray-600 */
color: #4b5563;

/* Tailwind: text-gray-700 */
color: #374151;

/* Tailwind: text-gray-900 */
color: #111827;

/* Tailwind: text-blue-600 */
color: #2563eb;

/* Tailwind: text-blue-700 */
color: #1d4ed8;

/* Tailwind: text-green-700 */
color: #15803d;

/* Tailwind: text-red-600 */
color: #dc2626;

/* Tailwind: text-white */
color: #ffffff;
```

### Colores de Fondo

```css
/* Tailwind: bg-white */
background-color: #ffffff;

/* Tailwind: bg-gray-50 */
background-color: #f9fafb;

/* Tailwind: bg-gray-100 */
background-color: #f3f4f6;

/* Tailwind: bg-blue-600 */
background-color: #2563eb;

/* Tailwind: bg-blue-50 */
background-color: #eff6ff;

/* Tailwind: bg-blue-100 */
background-color: #dbeafe;

/* Tailwind: bg-green-600 */
background-color: #16a34a;

/* Tailwind: bg-yellow-400 */
background-color: #facc15;

/* Tailwind: bg-red-50 */
background-color: #fef2f2;
```

---

## Bordes y Sombras

### Bordes

```css
/* Tailwind: border */
border-width: 1px;

/* Tailwind: border-2 */
border-width: 2px;

/* Tailwind: border-gray-300 */
border-color: #d1d5db;

/* Tailwind: border-blue-500 */
border-color: #3b82f6;

/* Tailwind: border-red-500 */
border-color: #ef4444;

/* Tailwind: border-b (solo borde inferior) */
border-bottom-width: 1px;

/* Tailwind: border-t (solo borde superior) */
border-top-width: 1px;
```

### Border Radius (Redondeo)

```css
/* Tailwind: rounded */
border-radius: 0.25rem; /* 4px */

/* Tailwind: rounded-full */
border-radius: 9999px; /* Círculo completo */

/* Tailwind: rounded-none */
border-radius: 0;
```

### Sombras

```css
/* Tailwind: shadow-sm */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Tailwind: shadow */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Tailwind: shadow-md */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
```

---

## Flexbox y Grid

### Flexbox

```css
/* Tailwind: flex */
display: flex;

/* Tailwind: flex items-center */
display: flex;
align-items: center;

/* Tailwind: flex justify-between */
display: flex;
justify-content: space-between;

/* Tailwind: flex-1 */
flex: 1 1 0%;

/* Tailwind: flex-col */
flex-direction: column;

/* Tailwind: gap-2 */
gap: 0.5rem; /* 8px */

/* Tailwind: gap-4 */
gap: 1rem; /* 16px */
```

### Grid

```css
/* Tailwind: grid */
display: grid;

/* Tailwind: grid-cols-1 */
grid-template-columns: repeat(1, minmax(0, 1fr));

/* Tailwind: grid-cols-2 */
grid-template-columns: repeat(2, minmax(0, 1fr));

/* Tailwind: grid-cols-4 */
grid-template-columns: repeat(4, minmax(0, 1fr));

/* Tailwind: gap-4 */
gap: 1rem; /* 16px */
```

---

## Interactividad

### Hover States

```css
/* Tailwind: hover:bg-gray-100 */
.element:hover {
  background-color: #f3f4f6;
}

/* Tailwind: hover:text-blue-600 */
.element:hover {
  color: #2563eb;
}

/* Tailwind: hover:underline */
.element:hover {
  text-decoration: underline;
}
```

### Focus States

```css
/* Tailwind: focus:outline-none */
.element:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Tailwind: focus:border-blue-500 */
.element:focus {
  border-color: #3b82f6;
}
```

### Transitions

```css
/* Tailwind: transition-colors */
transition-property: color, background-color, border-color;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 150ms;

/* Tailwind: transition-transform */
transition-property: transform;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 150ms;

/* Tailwind: duration-300 */
transition-duration: 300ms;
```

### Cursor

```css
/* Tailwind: cursor-pointer */
cursor: pointer;
```

---

## Componentes Específicos

### Header

```css
/* Equivalente a: bg-white border-b-2 border-gray-300 shadow-sm */
.header {
  background-color: #ffffff;
  border-bottom-width: 2px;
  border-bottom-color: #d1d5db;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
```

### Panel/Card

```css
/* Equivalente a: bg-white border border-gray-300 rounded */
.panel {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}
```

### Botón Primario

```css
/* Equivalente a: px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded */
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

### Input de Formulario

```css
/* Equivalente a: w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 */
.form-input {
  width: 100%;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
}

.form-input:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border-color: #3b82f6;
}
```

### Badge

```css
/* Equivalente a: inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs */
.badge {
  display: inline-block;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  background-color: #dbeafe;
  color: #1e40af;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}
```

---

## Responsive Design

### Breakpoints de Tailwind

```css
/* sm: 640px */
@media (min-width: 640px) {
  /* Tailwind: sm:text-lg */
  font-size: 1.125rem;
}

/* md: 768px */
@media (min-width: 768px) {
  /* Tailwind: md:grid-cols-2 */
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

/* lg: 1024px */
@media (min-width: 1024px) {
  /* Tailwind: lg:grid-cols-4 */
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

/* xl: 1280px */
@media (min-width: 1280px) {
  /* Tailwind: xl:px-8 */
  padding-left: 2rem;
  padding-right: 2rem;
}
```

---

## Utilidades Especiales

### Aspect Ratio

```css
/* Tailwind: aspect-[4/3] */
aspect-ratio: 4 / 3;
```

### Object Fit

```css
/* Tailwind: object-cover */
object-fit: cover;
```

### Overflow

```css
/* Tailwind: overflow-hidden */
overflow: hidden;

/* Tailwind: overflow-x-auto */
overflow-x: auto;
```

### Position

```css
/* Tailwind: relative */
position: relative;

/* Tailwind: absolute */
position: absolute;

/* Tailwind: fixed */
position: fixed;
```

---

## Escala de Espaciado de Tailwind

Para referencia rápida:

| Clase | Valor    | Píxeles |
|-------|----------|---------|
| 0     | 0        | 0px     |
| 0.5   | 0.125rem | 2px     |
| 1     | 0.25rem  | 4px     |
| 1.5   | 0.375rem | 6px     |
| 2     | 0.5rem   | 8px     |
| 3     | 0.75rem  | 12px    |
| 4     | 1rem     | 16px    |
| 5     | 1.25rem  | 20px    |
| 6     | 1.5rem   | 24px    |
| 8     | 2rem     | 32px    |
| 10    | 2.5rem   | 40px    |
| 12    | 3rem     | 48px    |
| 16    | 4rem     | 64px    |
| 24    | 6rem     | 96px    |

---

**Nota:** Este mapeo te permite convertir cualquier componente de Tailwind a CSS tradicional si necesitas trabajar sin el framework.
