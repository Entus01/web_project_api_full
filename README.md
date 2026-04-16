# web_project_api_full

Aplicacion web full stack para gestion de usuarios y tarjetas tipo red social, con autenticacion por JWT y operaciones CRUD protegidas.

## Descripcion del proyecto

Este repositorio contiene dos aplicaciones dentro de un mismo workspace:

- backend: API REST con Express y MongoDB.
- frontend: cliente web en React + Vite.

El flujo principal permite que un usuario se registre, inicie sesion, consulte y actualice su perfil, cree tarjetas, de o quite likes y elimine solo sus propias tarjetas.

## Herramientas usadas

### Backend

- Node.js + Express.
- MongoDB + Mongoose.
- JWT con jsonwebtoken.
- Hash de contrasena con bcryptjs.
- Validacion de requests con celebrate/Joi y validator.
- Logging con winston y express-winston.
- Manejo de CORS con middleware propio.
- Variables de entorno con dotenv.

### Frontend

- React.
- React Router.
- Vite.
- ESLint.

### Monorepo

- Workspaces de npm para ejecutar frontend y backend desde la raiz.

## Caracteristicas especiales

- Autenticacion y autorizacion basadas en token JWT (Bearer).
- Rutas publicas y privadas bien separadas (`/signup`, `/signin` publicas; resto protegido).
- Validacion de datos de entrada en capas (Joi + validaciones de modelo).
- Seguridad en usuarios: password con `select: false` y comparacion segura en login.
- Control de permisos: solo el owner de una tarjeta puede eliminarla.
- Likes idempotentes con `$addToSet` y `$pull` en MongoDB.
- Middleware centralizado para manejo de errores.
- Logging de solicitudes y errores en archivos dedicados.
- Consumo de API por entorno mediante `VITE_API_URL`.

## Ventajas del proyecto

- Arquitectura clara separada por capas y por responsabilidad.
- Base solida para seguir escalando funcionalidades de producto.
- Buen nivel de seguridad para un proyecto full stack academico/profesional inicial.
- Integracion frontend-backend funcional con sesiones persistentes por token.
- Codigo relativamente modular en rutas, controladores, middlewares y utilidades.

## Oportunidades de mejora

- Despliegue completo en produccion con documentacion (dominio, nginx, SSL, PM2).
- Agregar pruebas automaticas (unitarias, integracion y e2e).
- Estandarizar respuestas de error con codigos y mensajes de negocio.
- Implementar rate limiting y helmet para reforzar seguridad HTTP.
- Añadir rotacion de logs para entornos productivos.
- Mejorar observabilidad (health checks y metricas).
- Incluir pipeline CI/CD para lint, test y build.

## Estructura del repositorio

```text
backend/
frontend/
package.json
README.md
```

## Como ejecutar en local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Levantar backend y frontend en desarrollo

```bash
npm run dev
```

Scripts utiles desde la raiz:

- `npm run dev`: backend + frontend en paralelo.
- `npm run dev:backend`: solo API.
- `npm run dev:frontend`: solo cliente.
- `npm run build`: build del frontend.

Puertos en desarrollo local:

- Frontend (Vite): `http://localhost:4000`.
- Backend (API): `http://localhost:3000`.

## Variables de entorno

En backend se usan variables de entorno para seguridad y configuracion. Ejemplo minimo:

```env
PORT=3000
JWT_SECRET=tu_secreto_seguro
NODE_ENV=development
```

En frontend se usa:

```env
VITE_API_URL=http://localhost:3000
```

Nota: `VITE_API_URL` es la direccion de la API que consume el frontend, no el puerto del servidor de Vite.

## Estado actual

El proyecto ya cubre autenticacion, autorizacion, gestion de perfil, tarjetas y likes con validacion y manejo de errores. El principal siguiente paso es cerrar infraestructura y despliegue de produccion.
