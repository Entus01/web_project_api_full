# web_project_api_full

## Descripcion del proyecto

web_project_api_full es la base de una aplicacion web full stack orientada a la gestion de usuarios y tarjetas tipo red social. El objetivo del proyecto es construir una API segura en Node.js y MongoDB, conectarla con un frontend en React y desplegar ambos componentes en un servidor accesible por dominio y HTTPS.

Actualmente el repositorio ya incluye una base de backend con Express, Mongoose, modelos para usuarios y tarjetas, controladores iniciales y rutas separadas. La carpeta frontend/ existe, pero todavia no contiene la aplicacion cliente.

## Objetivo funcional

La aplicacion debe permitir:

- registro de usuarios;
- inicio de sesion con JWT;
- consulta y edicion del perfil;
- actualizacion del avatar;
- creacion y eliminacion de tarjetas;
- agregar y quitar likes;
- proteccion de rutas mediante autorizacion.

## Ventajas del proyecto

- Separa claramente frontend y backend, lo que facilita el mantenimiento y el despliegue.
- Usa una estructura modular con rutas, controladores y modelos independientes.
- Permite escalar la aplicacion agregando middlewares, validaciones y manejo centralizado de errores.
- Prepara el backend para autenticacion real con contrasenas cifradas y tokens JWT.
- Facilita una integracion posterior con un cliente React y despliegue en la nube.

## Herramientas utilizadas

### Backend actual

- Node.js
- Express
- MongoDB
- Mongoose
- validator
- ESLint con Airbnb Base
- Nodemon

### Herramientas previstas para completar el proyecto

- bcryptjs para hash de contrasenas
- jsonwebtoken para autenticacion con JWT
- celebrate y Joi para validar solicitudes
- cors para habilitar peticiones entre frontend y backend
- Winston o una solucion similar para logs
- PM2 para ejecucion en produccion
- Nginx para publicar frontend y API en servidor
- React para la parte cliente en frontend/

## Estructura del repositorio

```text
.git/
backend/
frontend/
README.md
```

Dentro de backend/ la aplicacion ya esta organizada en:

- app.js
- controllers/
- models/
- routes/
- data/

## Estado actual

- Existe conexion base a MongoDB local aroundb.
- El modelo de usuario ya incluye email y password.
- Hay controladores iniciales para usuarios y tarjetas.
- Existen rutas separadas para users y cards.
- Aun faltan autenticacion completa, middlewares dedicados, validaciones robustas, logs, manejo centralizado de errores y frontend funcional.

## Posibles mejoras

- Implementar login y registro con JWT y expiracion del token.
- Ocultar el campo password por defecto y recuperarlo solo al autenticar.
- Proteger todas las rutas privadas con un middleware auth.
- Validar cuerpos, parametros y cabeceras con celebrate/Joi.
- Centralizar el manejo de errores y normalizar respuestas HTTP.
- Restringir acciones segun el propietario del recurso.
- Agregar logs de solicitudes y errores en archivos separados.
- Integrar el frontend React con almacenamiento de token en localStorage.
- Configurar variables de entorno para produccion.
- Desplegar con dominio, HTTPS, Nginx y PM2.

## Proxima meta de desarrollo

Completar la autenticacion, proteger la API, integrar el frontend y dejar el proyecto listo para despliegue en la nube.
