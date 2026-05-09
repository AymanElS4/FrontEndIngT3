# Estado Actual del Proyecto

> **Última actualización:** 2026-05-09

## Resumen Ejecutivo

El proyecto ha completado la **Fase de Infraestructura de Backend**. Se ha implementado el esquema de base de datos estricto, la autenticación JWT y los servicios de API en el frontend. El sistema ahora permite el flujo real de Login y Registro conectado a una base de datos SQLite.

---

## Frontend — Estado ✅ Conectado (Fase 1)

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Proyecto Vite+React | ✅ Funcional | Build exitoso, dev server OK |
| `api.ts` | ✅ Creado | Servicio de comunicación con backend |
| `AuthContext.tsx` | ✅ Creado | Manejo de sesión real (JWT) |
| Login / Registro | ✅ Conectados | Flujo real con backend |
| Gestor de Casos | ⚠️ Mock | UI lista, pendiente conectar a API |
| Biblioteca de Códigos | ⚠️ Mock | UI lista, pendiente conectar a API |
| Gestión de Miembros | ⚠️ Mock | UI lista, pendiente conectar a API |

## Backend — Estado ✅ Funcional (Core)

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Proyecto Django | ✅ Configurado | `INSTALLED_APPS` corregido |
| Modelos | ✅ Completos | 8 tablas del esquema legal implementadas |
| Migraciones | ✅ Ejecutadas | Base de datos `db.sqlite3` creada |
| API REST (DRF) | ✅ Implementada | ViewSets y Serializers para todas las tablas |
| JWT Auth | ✅ Implementada | Endpoints login, register, refresh y me |
| CORS | ✅ Configurado | Permitido para localhost:5173 |
| Seed Data | ✅ Ejecutado | Roles, Estados, Tipos y Admin user creados |

---

## Progreso por Sprint

| Sprint | Progreso | Estado |
|--------|----------|--------|
| Sprint 1 | **85%** | 🟢 Core Backend + Auth Frontend listo |
| Sprint 2 | **35%** | 🟡 UI de pagos lista, Backend models listos |
| Sprint 3 | **15%** | 🟡 UI admin lista, Backend models listos |

### Desglose Sprint 1 (Completado: 8/9)
- [x] ✅ Pantalla de Login (Frontend)
- [x] ✅ Pantalla de Registro (Frontend)
- [x] ✅ Búsqueda filtrada de casos (Frontend UI)
- [x] ✅ Consulta de códigos legales con filtros (Frontend UI)
- [x] ✅ Visor de documentos (Frontend)
- [x] ✅ Endpoints API de autenticación JWT (Backend)
- [x] ✅ Modelos de datos en Django (Backend)
- [x] ✅ Conexión Frontend-Backend (Auth)
- [ ] ❌ Consumo de Casos/Códigos reales (Frontend en progreso)

## Notas Relacionadas
- [[Brechas_y_TODOs]]
- [[Contexto_General]]
