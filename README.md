# web_project_api_full

Guia paso a paso para completar el proyecto, siguiendo el orden exacto de los requisitos entregados y marcando el estado actual del repositorio.

## Leyenda de estado

- [x] Completado
- [~] Parcial
- [ ] Pendiente

## Estado general auditado

El repositorio ya tiene separadas las carpetas backend/ y frontend/, existe autenticacion base con JWT, el modelo de usuario ya incluye email y password, el frontend ya implementa registro, login y consumo de rutas protegidas con token en los headers, CORS ya esta habilitado en el backend, y ya existe validacion de solicitudes con celebrate/Joi y validator.isURL junto con middleware centralizado de errores. Tambien ya existe integracion de logging de solicitudes y errores en app.js con middlewares dedicados y dependencias instaladas. Aun faltan configuracion de produccion, despliegue y documentacion de infraestructura.

## Pasos completados (auditado al 2026-04-10)

- [x] Parte I completa: pasos 1 al 11 cerrados.
- [x] Parte II paso 1 (manejo centralizado de errores) cerrado.
- [x] Parte II paso 2 (validacion de solicitudes) cerrado, incluyendo validacion de URL con validator.isURL.
- [x] Parte II paso 3 (registro de solicitudes y errores) cerrado.
- [x] Integracion funcional local frontend-backend operativa con puertos separados y URL de API parametrizada por entorno.

## Parte I. Autorizacion y registro de usuarios

### 1. Anadir el correo electronico y la contrasena al esquema de usuario

- [x] El modelo de usuario ya incluye email.
- [x] El modelo de usuario ya incluye password.
- [x] El email ya esta marcado como unico.
- [x] El email ya se valida con validator.isEmail.
- [x] La contrasena todavia se devuelve desde consultas especiales de autenticacion y todavia no se elimina manualmente en createUser, lo cual es coherente con la evolucion del ejercicio hasta llegar al paso 10.

Resultado actual: completado.

### 2. Actualizar el controlador createUser

- [x] createUser ya recibe name, about, avatar, email y password desde req.body.
- [x] La contrasena ya se cifra con bcrypt antes de guardarse.
- [x] El esquema ya define valores por defecto para name, about y avatar.
- [x] name, about y avatar ya son opcionales en el esquema.

Resultado actual: completado.

### 3. Crear el controlador login

- [x] Ya existe un controlador login en controllers/users.js.
- [x] El controlador autentica con email y password mediante findUserByCredentials.
- [x] El JWT ya incluye solo la propiedad _id.
- [x] El token ya expira en 7 dias.
- [x] Si las credenciales fallan, ya responde con 401.
- [x] El backend ya carga variables de entorno con dotenv y usa JWT_SECRET desde .env.

Resultado actual: completado.

Paso siguiente: mantener JWT_SECRET distinto por entorno y no versionar archivos .env.

### 4. Crear una ruta para el inicio de sesion y el registro

- [x] app.js ya expone POST /signin.
- [x] app.js ya expone POST /signup.

Resultado actual: completado.

Paso siguiente: mantener estas dos rutas publicas fuera del router protegido y validar sus cuerpos con celebrate.

### 5. Crear un middleware para la autorizacion

- [x] Ya existe un middleware en middlewares/auth.js.
- [x] El middleware lee el token desde Authorization con formato Bearer.
- [x] Cuando el token es valido, asigna req.user = payload y llama a next().
- [x] Cuando falta el header Authorization o el token esta mal formado, el middleware responde con 401.
- [x] El middleware base ya gestiona el rechazo de accesos no autenticados.
- [x] El middleware valida el token con JWT_SECRET obtenido desde variables de entorno.

Resultado actual: completado.

Paso siguiente: en el paso 7 se refina este middleware para distinguir entre autenticacion fallida y acceso prohibido segun el caso.

### 6. Anadir un controlador y una ruta para obtener los datos del usuario

- [x] Ya existe el controlador getCurrentUser.
- [x] El router de usuarios ya usa /me, /:id y /me/avatar, por lo que las rutas reales quedan como /users/me, /users/:id y /users/me/avatar.
- [x] El frontend ya puede apuntar a GET /users/me y PATCH /users/me/avatar sin el prefijo duplicado.

Resultado actual: completado.

Paso siguiente: validar params y bodies de estas rutas con celebrate para evitar ids o payloads invalidos.

### 7. Proteger la API con una autorizacion

- [x] app.js ya protege las rutas de /users y /cards usando el middleware auth.
- [x] /signin y /signup quedan fuera de la proteccion.
- [x] Las rutas protegidas ya distinguen entre 401 cuando faltan credenciales y 403 cuando el token no autoriza el acceso.
- [x] El middleware auth ya pasa los errores 401 y 403 mediante next(err) al manejador centralizado en lugar de responder directamente.

Resultado actual: completado.

Paso siguiente: mantener consistente esta distincion tambien en futuros middlewares y errores de permisos sobre recursos.

### 8. Eliminar el objeto de usuario hardcoded

- [x] El middleware con req.user hardcoded ya no existe en app.js.

Resultado actual: completado.

### 9. Comprobar los derechos de los usuarios

- [x] La eliminacion de tarjetas ya comprueba que el owner coincida con req.user._id.
- [x] La edicion de perfil y avatar se hace usando req.user._id, por lo que un usuario solo puede editar sus propios datos.

Resultado actual: completado.

### 10. Evitar que la API devuelva el hash de la contrasena

- [x] password ya tiene select: false en el esquema.
- [x] findUserByCredentials ya usa select('+password') para autenticar.

Resultado actual: completado.

### 11. Configurar la autorizacion en el front-end

- [x] El frontend ya guarda el token en localStorage.
- [x] El frontend ya intenta validar el token al cargar la aplicacion.
- [x] El frontend ya envia Authorization: Bearer <token> en las solicitudes protegidas.
- [x] El backend ya expone correctamente GET /users/me y PATCH /users/me/avatar.
- [x] El frontend ya corre en el puerto 4000, asi que el conflicto local con el backend en el puerto 3000 ya quedo resuelto.
- [x] App.jsx ahora deriva isLiked comparando card.likes.includes(currentUser._id), por lo que el boton de like refleja correctamente si el usuario autenticado ya dio like o no.
- [x] La URL base del frontend ya fue parametrizada con import.meta.env.VITE_API_URL en api.jsx y auth.jsx.

Resultado actual: completado.

Paso siguiente: crear valores por entorno (desarrollo/produccion) para VITE_API_URL antes del despliegue.

## Parte II. Configuracion y despliegue

### 1. Implementar el manejo centralizado de errores

- [x] Ya existe un middleware centralizado de errores en app.js (errorHandler).
- [x] Los controladores principales ya propagan errores con next(err) para que se resuelvan en un solo punto.
- [x] La regla no-unused-vars ya esta configurada en .eslintrc para ignorar el parametro next.
- [x] El middleware auth ya usa next(err) para 401 y 403, por lo que todos los errores pasan por errorHandler.

Resultado actual: completado.

Paso siguiente: verificar que no quede ninguna respuesta de error directa fuera del middleware central.

### 2. Validar solicitudes

- [x] Ya se esta usando celebrate.
- [x] Ya se esta usando Joi para validar body y params en auth, users y cards.
- [x] Existe utilidad central de validacion en backend/utils/validators.js.
- [x] Las URL ya se validan con validator.isURL (http/https y protocolo requerido) en avatar y link.

Resultado actual: completado.

Paso siguiente: ampliar esquemas cuando se agreguen nuevas rutas o headers especificos.

### 3. Implementar el registro de solicitudes y errores

- [x] Ya existe middleware de logging en backend/middlewares/logger.js.
- [x] app.js ya integra requestLogger y errorLogger en el flujo de middlewares.
- [x] Ya estan definidos archivos de salida para logs en logs/requests.log y logs/errors.log.
- [x] El logger define salida JSON con timestamp para archivos de logs.
- [x] Las dependencias de logging (winston y express-winston) ya estan declaradas en backend/package.json.
- [x] backend/.gitignore y frontend/.gitignore ya ignoran archivos .log.

Resultado actual: completado.

Paso siguiente: monitorear crecimiento de archivos de log y definir rotacion en produccion.

### 4. Conectar el back-end y el front-end de la aplicacion

- [x] El repositorio ya tiene las carpetas backend/ y frontend/ en la raiz.
- [x] El directorio .git esta en la raiz del proyecto.
- [x] A nivel de codigo, la URL del backend ya esta parametrizada por entorno con VITE_API_URL (ya no queda hardcodeada en localhost dentro de api.jsx y auth.jsx).
- [x] En desarrollo local ya no hay conflicto de puertos: el backend usa 3000 y Vite esta configurado en 4000.

Resultado actual: parcial.

Paso siguiente: construir el frontend para produccion y documentar el flujo de despliegue en servidor.

### 5. Crear un servidor en la nube y desplegar la API

- [ ] No hay evidencia de despliegue en servidor dentro del repositorio.
- [ ] No hay documentacion de IP, dominio o comandos de provisionamiento.

Resultado actual: pendiente.

Paso siguiente: crear la instancia, instalar Node.js, MongoDB o la conexion remota correspondiente, clonar el proyecto y desplegar el backend.

### 6. Asegurate de que tu pagina web es totalmente funcional

- [~] El codigo incluye registro, login, perfil, avatar, tarjetas y likes.
- [~] La integracion completa todavia no esta cerrada por tareas de despliegue y pruebas finales en entorno publicado.
- [x] Las rutas de perfil y avatar ya quedaron alineadas como /users/me y /users/me/avatar.
- [x] El flujo de likes ya esta alineado: App.jsx deriva isLiked desde card.likes.includes(currentUser._id) y el backend guarda los likes como array de ObjectIds con $addToSet y $pull.
- [x] cors ya esta habilitado en app.js.
- [ ] No hay evidencia de que todas las solicitudes antiguas hayan sido eliminadas como parte de una verificacion final de despliegue.

Resultado actual: parcial.

Paso siguiente: ejecutar pruebas end-to-end en el frontend publicado y cerrar checklist de solicitudes legacy.

### 7. Crear el archivo .env

- [x] Ya existe backend/.env con JWT_SECRET y NODE_ENV para desarrollo.
- [x] app.js ya carga variables de entorno usando dotenv.
- [x] backend/.gitignore y frontend/.gitignore ya excluyen archivos .env.
- [~] Falta definir y documentar la estrategia de variables para produccion (por ejemplo, variables del servidor o .env.production segun entorno).

Resultado actual: parcial.

Paso siguiente: definir variables reales de produccion en el servidor y documentarlas sin exponer secretos.

### 8. Crear un dominio y vincularlo al servidor

- [ ] No hay dominio documentado en el proyecto.
- [ ] No hay configuracion de nginx documentada en el repositorio.

Resultado actual: pendiente.

Paso siguiente: registrar el dominio, apuntarlo a la IP publica y configurar nginx para servir frontend y subdominio o prefijo de API.

### 9. Emitir y conectar certificados

- [ ] No hay evidencia de HTTPS ni de certificados configurados.

Resultado actual: pendiente.

Paso siguiente: emitir certificados con Let's Encrypt y configurar renovacion automatica.

### 10. Pruebas de caida del servidor

- [ ] No existe la ruta GET /crash-test.
- [ ] No hay configuracion de PM2 documentada o incluida en el proyecto.

Resultado actual: pendiente.

Paso siguiente: desplegar con PM2, anadir temporalmente /crash-test para la revision y retirarla al finalizar.

### 11. Anadir informacion sobre el acceso a tu servidor

- [ ] El README todavia no incluye un dominio real de produccion.

Resultado actual: pendiente.

Paso siguiente: cuando el despliegue este listo, agregar el dominio del frontend y el de la API en este README.

## Orden recomendado de implementacion

1. Corregir rutas y autenticacion base del backend.
2. Cerrar la compatibilidad real entre frontend y backend.
3. Agregar logs de solicitudes y errores.
4. Preparar configuracion por entorno con .env para produccion.
5. Desplegar backend y frontend en servidor.
6. Habilitar CORS.
7. Configurar dominio, nginx y HTTPS.
8. Levantar el proceso con PM2 y probar /crash-test.
9. Actualizar este README con el dominio final.

## Resumen rapido

Lo ya completado de forma solida es el esquema base de autenticacion, el hash de contrasenas, la proteccion general de rutas, la restriccion de permisos de usuario, el ocultamiento del hash de password, la habilitacion de CORS, la separacion de puertos entre frontend y backend, la carga de JWT_SECRET por .env con dotenv, las rutas reales /users/me del router de usuarios, la URL de API parametrizada por entorno en el frontend, la logica de likes con isLiked derivado del array de usuarios que dieron like, el middleware centralizado de errores, la validacion de rutas con celebrate/Joi + validator.isURL y el registro de solicitudes/errores con middlewares y dependencias instaladas. Lo mas urgente que falta dentro del codigo actual es cerrar despliegue e infraestructura de produccion y documentar el acceso final.
