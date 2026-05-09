# Guía de Estilos por Componente

Esta guía documenta los estilos CSS específicos para cada componente de TechMarket, con comentarios explicativos.

---

## 🏠 Header (Navegación Principal)

### Ubicación: `/components/Header.tsx`

```css
/**
 * CONTENEDOR DEL HEADER
 * Fondo blanco con borde inferior estilo Yii
 */
.header-container {
  background-color: #ffffff;
  border-bottom: 2px solid #d1d5db; /* Borde grueso para enfatizar separación */
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); /* Sombra sutil */
}

/**
 * CONTENEDOR INTERNO (máximo ancho)
 */
.header-inner {
  max-width: 80rem; /* 1280px */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/**
 * LAYOUT FLEX DEL HEADER
 */
.header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem; /* 64px - altura estándar del navbar */
}

/**
 * LOGO / TÍTULO
 */
.header-logo {
  font-size: 1.25rem; /* 20px */
  color: #1d4ed8; /* Azul Yii */
  margin-right: 2rem;
}

/**
 * LINKS DE NAVEGACIÓN
 */
.nav-link {
  padding: 0.5rem 0.75rem;
  color: #374151;
  transition: background-color 0.15s;
}

.nav-link:hover {
  background-color: #f3f4f6;
  border-radius: 0.25rem;
}

/**
 * BARRA DE BÚSQUEDA EN HEADER
 */
.header-search {
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}

.header-search input {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 0.875rem;
  width: 12rem; /* 192px */
}
```

---

## 🍞 Breadcrumbs (Migas de Pan)

### Ubicación: `/components/Breadcrumbs.tsx`

```css
/**
 * CONTENEDOR DE BREADCRUMBS
 * Estilo clásico de Yii con fondo blanco y borde
 */
.breadcrumb-container {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

/**
 * LAYOUT DE BREADCRUMBS
 */
.breadcrumb-flex {
  display: flex;
  align-items: center;
  font-size: 0.875rem; /* 14px */
  color: #6b7280;
}

/**
 * LINKS INDIVIDUALES
 */
.breadcrumb-link {
  color: #6b7280;
  transition: color 0.15s;
}

.breadcrumb-link:hover {
  color: #2563eb; /* Azul al hover */
}

/**
 * ELEMENTO ACTIVO/ACTUAL
 */
.breadcrumb-current {
  color: #111827; /* Más oscuro para destacar */
  font-weight: 500;
}

/**
 * SEPARADOR (ChevronRight icon)
 */
.breadcrumb-separator {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: #9ca3af;
}
```

---

## 🎴 Product Cards (Tarjetas de Producto)

### Ubicación: `/components/ProductCard.tsx`

```css
/**
 * TARJETA DE PRODUCTO
 * Card con hover effect para mejorar interactividad
 */
.product-card {
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.product-card:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/**
 * CONTENEDOR DE IMAGEN
 * Aspect ratio 4:3 para consistencia
 */
.product-image-container {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #f3f4f6; /* Fallback mientras carga */
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05); /* Zoom sutil al hover */
}

/**
 * CONTENIDO DE LA CARD
 */
.product-card-body {
  padding: 0.75rem;
}

/**
 * TÍTULO DEL PRODUCTO
 */
.product-title {
  color: #1d4ed8; /* Azul para links */
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.product-title:hover {
  text-decoration: underline;
}

/**
 * PRECIO
 */
.product-price {
  color: #15803d; /* Verde para precios */
  font-size: 1.125rem; /* 18px - destacado */
  margin-bottom: 0.5rem;
  font-weight: 500;
}

/**
 * METADATA (condición, categoría, ubicación)
 */
.product-meta {
  font-size: 0.75rem; /* 12px */
  color: #6b7280;
  display: flex;
  align-items: center;
}

.product-meta-icon {
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.25rem;
}
```

---

## 📋 Product Grid (Grilla de Productos)

### Ubicación: `/components/ProductGrid.tsx`

```css
/**
 * PANEL CONTENEDOR
 */
.product-grid-panel {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

/**
 * HEADER DEL PANEL
 */
.panel-header {
  border-bottom: 1px solid #d1d5db;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  font-size: 1.125rem; /* 18px */
  color: #374151;
}

/**
 * FILTROS DE BÚSQUEDA
 * Grid responsive para los filtros
 */
.search-filters-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Responsive: 2 columnas en tablets */
@media (min-width: 768px) {
  .search-filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Responsive: 5 columnas en desktop */
@media (min-width: 1024px) {
  .search-filters-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/**
 * INPUT DE BÚSQUEDA CON ICONO
 */
.search-input-container {
  position: relative;
}

.search-icon {
  width: 1rem;
  height: 1rem;
  position: absolute;
  left: 0.75rem;
  top: 0.625rem; /* Centrado vertical */
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding-left: 2.25rem; /* Espacio para el icono */
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

/**
 * GRILLA DE PRODUCTOS
 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/**
 * CONTADOR DE RESULTADOS
 */
.results-count {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}
```

---

## 📝 Product Form (Formulario de Producto)

### Ubicación: `/components/ProductForm.tsx`

```css
/**
 * GRUPO DE FORMULARIO
 */
.form-group {
  margin-bottom: 1rem;
}

/**
 * LABEL DE FORMULARIO
 */
.form-label {
  display: block;
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.5rem;
}

/**
 * ASTERISCO REQUERIDO
 */
.required-field {
  color: #dc2626; /* Rojo */
}

/**
 * INPUT DE TEXTO
 */
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  transition: border-color 0.15s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6; /* Azul al enfocarse */
}

/**
 * INPUT CON ERROR
 */
.form-input-error {
  border-color: #ef4444; /* Rojo */
}

/**
 * MENSAJE DE ERROR
 */
.error-message {
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
}

.error-icon {
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.25rem;
}

/**
 * SELECT / DROPDOWN
 */
.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: #ffffff;
  cursor: pointer;
}

/**
 * TEXTAREA
 */
.form-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  resize: vertical;
}

/**
 * ZONA DE CARGA DE ARCHIVOS
 */
.file-upload-zone {
  border: 2px dashed #d1d5db;
  border-radius: 0.25rem;
  padding: 1.5rem;
  text-align: center;
  background-color: #f9fafb;
  transition: all 0.15s;
}

.file-upload-zone-error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.upload-icon {
  width: 2rem;
  height: 2rem;
  color: #9ca3af;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.5rem;
}

/**
 * ALERT INFO (Banner informativo)
 */
.alert-info {
  background-color: #eff6ff; /* Azul muy claro */
  border: 1px solid #bfdbfe;
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
}

.alert-info-text {
  font-size: 0.875rem;
  color: #1e40af; /* Azul oscuro */
}

/**
 * GRID DE FORMULARIO (2 columnas)
 */
.form-grid-2 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .form-grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 📊 Data Table (Tabla de Datos)

### Ubicación: `/components/MyProducts.tsx`

```css
/**
 * CONTENEDOR DE TABLA CON OVERFLOW
 */
.table-container {
  overflow-x: auto;
}

/**
 * TABLA ESTILO YII GRIDVIEW
 */
.data-table {
  width: 100%;
  border: 1px solid #d1d5db;
  border-collapse: collapse;
}

/**
 * HEADER DE TABLA
 */
.data-table thead {
  background-color: #f9fafb;
}

.data-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
  border-bottom: 1px solid #d1d5db;
}

/**
 * CELDAS DE TABLA
 */
.data-table td {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #d1d5db;
}

/**
 * FILAS ALTERNADAS (Striped rows)
 */
.data-table tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

.data-table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

/**
 * HOVER EN FILAS
 */
.data-table tbody tr:hover {
  background-color: #f3f4f6;
}

/**
 * THUMBNAIL EN TABLA
 */
.table-thumbnail {
  width: 3rem; /* 48px */
  height: 3rem;
  object-fit: cover;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
}

/**
 * ACCIONES EN TABLA
 */
.table-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.375rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s;
}

.action-button-view {
  color: #2563eb;
}

.action-button-view:hover {
  background-color: #eff6ff;
}

.action-button-edit {
  color: #6b7280;
}

.action-button-edit:hover {
  background-color: #f3f4f6;
}
```

---

## ⭐ Review System (Sistema de Reseñas)

### Ubicación: `/components/UserProfile.tsx` y `/components/ReviewForm.tsx`

```css
/**
 * ESTRELLAS DE CALIFICACIÓN
 */
.rating-stars {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.star {
  width: 1rem;
  height: 1rem;
}

.star-filled {
  fill: #facc15; /* Amarillo */
  color: #facc15;
}

.star-empty {
  fill: #e5e7eb; /* Gris claro */
  color: #e5e7eb;
}

/**
 * ESTRELLAS INTERACTIVAS (para formulario)
 */
.star-interactive {
  width: 2.5rem; /* 40px - más grandes */
  height: 2.5rem;
  cursor: pointer;
  transition: all 0.15s;
}

.star-interactive:hover {
  transform: scale(1.1); /* Efecto de zoom al hover */
}

/**
 * DISTRIBUCIÓN DE CALIFICACIONES
 */
.rating-distribution {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.rating-label {
  width: 3rem; /* Ancho fijo para alineación */
}

/**
 * BARRA DE PROGRESO
 */
.progress-bar-bg {
  flex: 1;
  background-color: #e5e7eb;
  border-radius: 9999px; /* Completamente redondeado */
  height: 0.5rem; /* 8px */
  overflow: hidden;
}

.progress-bar-fill {
  background-color: #facc15; /* Amarillo */
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/**
 * CARD DE RESEÑA
 */
.review-card {
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: #ffffff;
}

/**
 * AVATAR DEL REVISOR
 */
.reviewer-avatar {
  width: 2.5rem; /* 40px */
  height: 2.5rem;
  border-radius: 9999px; /* Círculo */
  border: 1px solid #d1d5db;
  object-fit: cover;
}

/**
 * NOMBRE DEL REVISOR
 */
.reviewer-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

/**
 * FECHA DE RESEÑA
 */
.review-date {
  font-size: 0.75rem;
  color: #9ca3af;
}

/**
 * COMENTARIO DE RESEÑA
 */
.review-comment {
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.6;
  margin-top: 0.5rem;
}

/**
 * TIPO DE TRANSACCIÓN BADGE
 */
.transaction-badge-sale {
  background-color: #dcfce7; /* Verde claro */
  color: #166534; /* Verde oscuro */
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.transaction-badge-purchase {
  background-color: #dbeafe; /* Azul claro */
  color: #1e40af; /* Azul oscuro */
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}
```

---

## 👤 User Profile (Perfil de Usuario)

### Ubicación: `/components/UserProfile.tsx`

```css
/**
 * AVATAR GRANDE DE USUARIO
 */
.user-avatar-large {
  width: 6rem; /* 96px */
  height: 6rem;
  border-radius: 9999px;
  border: 2px solid #d1d5db;
  object-fit: cover;
}

/**
 * ESTADÍSTICAS DE USUARIO
 * Cards con colores diferenciados
 */
.stat-card {
  padding: 0.75rem 1rem;
  border: 1px solid;
  border-radius: 0.25rem;
  flex: 1;
}

/**
 * VENTAS (Azul)
 */
.stat-card-sales {
  background-color: #eff6ff;
  border-color: #bfdbfe;
  color: #1e40af;
}

.stat-card-sales-icon {
  color: #1d4ed8;
}

/**
 * COMPRAS (Verde)
 */
.stat-card-purchases {
  background-color: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.stat-card-purchases-icon {
  color: #16a34a;
}

/**
 * REPUTACIÓN (Amarillo)
 */
.stat-card-reputation {
  background-color: #fefce8;
  border-color: #fef08a;
  color: #a16207;
}

.stat-card-reputation-icon {
  color: #ca8a04;
}

/**
 * NÚMERO DE ESTADÍSTICA
 */
.stat-number {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
}

/**
 * LABEL DE ESTADÍSTICA
 */
.stat-label {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.stat-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}
```

---

## 🦶 Footer

### Ubicación: `/components/Footer.tsx`

```css
/**
 * FOOTER PRINCIPAL
 */
.footer {
  background-color: #ffffff;
  border-top: 1px solid #d1d5db;
  margin-top: 2rem;
}

.footer-inner {
  max-width: 80rem; /* 1280px */
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem 1rem;
}

/**
 * GRID DE SECCIONES DEL FOOTER
 */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/**
 * TÍTULO DE SECCIÓN
 */
.footer-section-title {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

/**
 * LINKS DEL FOOTER
 */
.footer-link {
  font-size: 0.75rem;
  color: #6b7280;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #2563eb;
}

/**
 * COPYRIGHT
 */
.footer-copyright {
  border-top: 1px solid #d1d5db;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #6b7280;
}
```

---

Esta guía proporciona una documentación completa de los estilos CSS utilizados en cada componente del proyecto TechMarket.
