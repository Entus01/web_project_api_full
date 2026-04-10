# web_project_api_full

Guia paso a paso para completar el proyecto, siguiendo el orden exacto de los requisitos entregados y marcando el estado actual del repositorio.

## Leyenda de estado

- [x] Completado
- [~] Parcial
- [ ] Pendiente

## Estado general auditado

El repositorio ya tiene separadas las carpetas backend/ y frontend/, existe autenticacion base con JWT, el modelo de usuario ya incluye email y password, el frontend ya implementa registro, login y consumo de rutas protegidas con token en los headers, y CORS ya esta habilitado en el backend. Aun faltan validaciones de entrada, manejo centralizado de errores, registro real de solicitudes y errores, configuracion de produccion, correccion de rutas protegidas del backend y despliegue.

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
- [x] En desarrollo ya existe una clave secreta por defecto cuando process.env.NODE_ENV !== 'production'.

Resultado actual: completado.

Paso siguiente: mantener JWT_SECRET obligatorio en produccion y moverlo a .env en el servidor.

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
- [x] El middleware ya usa la misma clave por defecto de desarrollo cuando process.env.NODE_ENV !== 'production'.

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
- [~] Hay otra incompatibilidad de datos: Card.jsx usa card.isLiked, pero el backend devuelve likes y no genera isLiked.
- [~] La URL base del frontend sigue fija en http://localhost:3000, por lo que falta prepararla para despliegue y para configuracion por entorno.
- [x] El frontend ya corre en el puerto 4000, asi que el conflicto local con el backend en el puerto 3000 ya quedo resuelto.
- [x] App.jsx ahora deriva isLiked comparando card.likes.includes(currentUser._id), por lo que el boton de like refleja correctamente si el usuario autenticado ya dio like o no.
- [~] La URL base del frontend sigue fija en http://localhost:3000, por lo que falta prepararla para despliegue y para configuracion por entorno.

Resultado actual: parcial.

Paso siguiente: parametrizar la URL de la API por entorno usando import.meta.env.VITE_API_URL.

## Parte II. Configuracion y despliegue

### 1. Implementar el manejo centralizado de errores

- [ ] No existe un middleware centralizado de errores en app.js.
- [ ] Los controladores siguen devolviendo respuestas directamente dentro de catch.
- [ ] No esta configurada la regla no-unused-vars para ignorar next en el middleware de errores.

Resultado actual: pendiente.

Paso siguiente: crear middleware de errores, propagar errores con next(err) y actualizar .eslintrc.

### 2. Validar solicitudes

- [ ] No se esta usando celebrate.
- [ ] No se esta usando Joi para validar body, params o headers.
- [ ] No existe una utilidad central para validar URL con validator.isURL en las solicitudes de entrada.

Resultado actual: pendiente.

Paso siguiente: agregar celebrate, definir esquemas para auth, users y cards, y validar cuerpos, parametros e ids.

### 3. Implementar el registro de solicitudes y errores

- [ ] No existe configuracion de logs request.log ni error.log.
- [ ] No hay logging en formato JSON.
- [x] backend/.gitignore y frontend/.gitignore ya ignoran archivos .log.

Resultado actual: parcial.

Paso siguiente: integrar un logger de solicitudes y errores, preferiblemente con winston y express-winston, y excluir los archivos de log del repositorio.

### 4. Conectar el back-end y el front-end de la aplicacion

- [x] El repositorio ya tiene las carpetas backend/ y frontend/ en la raiz.
- [x] El directorio .git esta en la raiz del proyecto.
- [~] A nivel de codigo todavia no esta resuelta la conexion final para despliegue: el frontend apunta a localhost y no hay configuracion de build publicada en servidor dentro del proyecto.
- [x] En desarrollo local ya no hay conflicto de puertos: el backend usa 3000 y Vite esta configurado en 4000.

Resultado actual: parcial.

Paso siguiente: preparar la URL del backend por entorno, construir el frontend y documentar el flujo de despliegue.

### 5. Crear un servidor en la nube y desplegar la API

- [ ] No hay evidencia de despliegue en servidor dentro del repositorio.
- [ ] No hay documentacion de IP, dominio o comandos de provisionamiento.

Resultado actual: pendiente.

Paso siguiente: crear la instancia, instalar Node.js, MongoDB o la conexion remota correspondiente, clonar el proyecto y desplegar el backend.

### 6. Asegurate de que tu pagina web es totalmente funcional

- [~] El codigo incluye registro, login, perfil, avatar, tarjetas y likes.
- [~] La integracion completa todavia no esta cerrada porque la URL de la API sigue apuntando a localhost.
- [x] Las rutas de perfil y avatar ya quedaron alineadas como /users/me y /users/me/avatar.
- [x] El flujo de likes ya esta alineado: App.jsx deriva isLiked desde card.likes.includes(currentUser._id) y el backend guarda los likes como array de ObjectIds con $addToSet y $pull.
- [x] cors ya esta habilitado en app.js.
- [ ] No hay evidencia de que todas las solicitudes antiguas hayan sido eliminadas como parte de una verificacion final de despliegue.

Resultado actual: parcial.

Paso siguiente: habilitar CORS, corregir incompatibilidades de datos y probar el flujo completo desde el frontend publicado.

### 7. Crear el archivo .env

- [ ] No hay manejo documentado de .env para produccion.
- [ ] El codigo actual no tiene fallback de desarrollo para JWT cuando no existe .env.

Resultado actual: pendiente.

Paso siguiente: usar process.env.JWT_SECRET en produccion y una clave fija de desarrollo fuera de produccion.

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
3. Implementar manejo centralizado de errores.
4. Implementar validacion con celebrate y Joi.
5. Agregar logs de solicitudes y errores.
6. Habilitar CORS.
7. Preparar configuracion por entorno con .env para produccion.
8. Desplegar backend y frontend en servidor.
9. Configurar dominio, nginx y HTTPS.
10. Levantar el proceso con PM2 y probar /crash-test.
11. Actualizar este README con el dominio final.

## Resumen rapido

Lo ya completado de forma solida es el esquema base de autenticacion, el hash de contrasenas, la proteccion general de rutas, la restriccion de permisos de usuario, el ocultamiento del hash de password, la habilitacion de CORS, la separacion de puertos entre frontend y backend, la clave JWT por defecto para desarrollo, las rutas reales /users/me del router de usuarios y la logica de likes con isLiked derivado del array de usuarios que dieron like. Lo mas urgente que falta dentro del codigo actual es parametrizar la URL de la API por entorno, y despues montar validacion, errores, logs y despliegue.
