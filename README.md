# web_project_api_full

Guia paso a paso para completar el proyecto, siguiendo el orden exacto de los requisitos entregados y marcando el estado actual del repositorio.

## Leyenda de estado

- [x] Completado
- [~] Parcial
- [ ] Pendiente

## Estado general auditado

El repositorio ya tiene separadas las carpetas backend/ y frontend/, existe autenticacion base con JWT, el modelo de usuario ya incluye email y password, y el frontend ya implementa registro, login y consumo de rutas protegidas con token en los headers. Aun faltan validaciones de entrada, manejo centralizado de errores, logs, CORS, configuracion de produccion, correccion de rutas protegidas del backend y despliegue.

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
- [~] En desarrollo no hay clave secreta por defecto; hoy depende de JWT_SECRET y falla con 500 si la variable no existe.

Resultado actual: parcial.

Paso siguiente: agregar una clave por defecto para desarrollo cuando process.env.NODE_ENV !== 'production'.

### 4. Crear una ruta para el inicio de sesion y el registro

- [x] app.js ya expone POST /signin.
- [x] app.js ya expone POST /signup.

Resultado actual: completado.

Paso siguiente: mantener estas dos rutas publicas fuera del router protegido y validar sus cuerpos con celebrate.

### 5. Crear un middleware para la autorizacion

- [x] Ya existe un middleware en middlewares/auth.js.
- [x] El middleware lee el token desde Authorization con formato Bearer.
- [x] Cuando el token es valido, asigna req.user = payload y llama a next().
- [~] Cuando el token es invalido responde 403, pero en este paso del enunciado se pide 401.
- [~] Igual que en login, falta una clave por defecto para desarrollo.

Resultado actual: parcial.

Paso siguiente: unificar el comportamiento del middleware con la especificacion del proyecto y con la futura configuracion por entorno.

### 6. Anadir un controlador y una ruta para obtener los datos del usuario

- [x] Ya existe el controlador getCurrentUser.
- [~] La ruta esta declarada como /users/me dentro de routes/users.js, pero ese router se monta en /users, asi que la ruta real queda como /users/users/me.
- [~] El mismo error de prefijo afecta tambien a GET /users/:id, PATCH /users/me y PATCH /users/me/avatar, que hoy se convierten en /users/users/:id, /users/users/me y /users/users/me/avatar.
- [~] El frontend espera GET /users/me y PATCH /users/me/avatar, por lo que hoy hay incompatibilidades reales de rutas.

Resultado actual: parcial.

Paso siguiente: corregir el router para usar /me, /:id y /me/avatar dentro de routes/users.js.

### 7. Proteger la API con una autorizacion

- [x] app.js ya protege las rutas de /users y /cards usando el middleware auth.
- [x] /signin y /signup quedan fuera de la proteccion.
- [~] El comportamiento de error todavia no esta completamente alineado con el requisito, porque mezcla 401 y 403 segun el caso.

Resultado actual: parcial.

Paso siguiente: normalizar la respuesta de acceso no autorizado y dejar clara la diferencia entre token ausente, token invalido y falta de permisos sobre recursos.

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
- [~] El flujo todavia depende de que el backend exponga correctamente GET /users/me y PATCH /users/me/avatar.
- [~] Hay otra incompatibilidad de datos: Card.jsx usa card.isLiked, pero el backend devuelve likes y no genera isLiked.
- [~] La URL base del frontend apunta a http://localhost:3000.
- [~] Vite tambien esta configurado para correr en el puerto 3000, lo que entra en conflicto con el backend durante el desarrollo local.

Resultado actual: parcial.

Paso siguiente: corregir las rutas /users del backend, adaptar el formato de tarjetas para likes y separar la URL y el puerto de la API por entorno.

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
- [~] frontend/.gitignore ya ignora archivos .log, pero no existe un .gitignore raiz que cubra de forma clara los logs del backend.

Resultado actual: parcial.

Paso siguiente: integrar un logger de solicitudes y errores, preferiblemente con winston y express-winston, y excluir los archivos de log del repositorio.

### 4. Conectar el back-end y el front-end de la aplicacion

- [x] El repositorio ya tiene las carpetas backend/ y frontend/ en la raiz.
- [x] El directorio .git esta en la raiz del proyecto.
- [~] A nivel de codigo todavia no esta resuelta la conexion final para despliegue: el frontend apunta a localhost y no hay configuracion de build publicada en servidor dentro del proyecto.
- [~] En desarrollo local hay conflicto de puertos porque el backend usa PORT=3000 por defecto y Vite tambien corre en 3000.

Resultado actual: parcial.

Paso siguiente: separar puertos de desarrollo, preparar la URL del backend por entorno, construir el frontend y documentar el flujo de despliegue.

### 5. Crear un servidor en la nube y desplegar la API

- [ ] No hay evidencia de despliegue en servidor dentro del repositorio.
- [ ] No hay documentacion de IP, dominio o comandos de provisionamiento.

Resultado actual: pendiente.

Paso siguiente: crear la instancia, instalar Node.js, MongoDB o la conexion remota correspondiente, clonar el proyecto y desplegar el backend.

### 6. Asegurate de que tu pagina web es totalmente funcional

- [~] El codigo incluye registro, login, perfil, avatar, tarjetas y likes.
- [~] La integracion completa todavia no esta cerrada por incompatibilidades entre frontend y backend.
- [~] El perfil y el avatar fallaran mientras el backend mantenga rutas con prefijo duplicado /users/users/.
- [~] El flujo de likes no esta alineado con el frontend porque Card.jsx depende de isLiked y el backend devuelve likes.
- [ ] No esta habilitado cors en app.js.
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

Lo ya completado de forma solida es el esquema base de autenticacion, el hash de contrasenas, la proteccion general de rutas, la restriccion de permisos de usuario y el ocultamiento del hash de password. Lo mas urgente que falta dentro del codigo actual es corregir las rutas /users mal prefijadas, separar los puertos de desarrollo entre frontend y backend, agregar fallback seguro para JWT en desarrollo, alinear el formato de likes con el frontend, y despues montar validacion, errores, logs y despliegue.
