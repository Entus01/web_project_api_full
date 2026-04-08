# Tripleten web_project_around_auth

# Proyecto: Autenticación y Autorización en React – *Alrededor de los EE.UU.*

Este proyecto implementa **registro y autorización de usuarios** en el frontend de la aplicación React *Alrededor de los EE.UU.*. Se trabaja en un nuevo repositorio, copiando el contenido del proyecto 14 como base.

---

## 1. Rutas y redirección
- Toda la funcionalidad principal está disponible únicamente para usuarios autorizados en la ruta raíz `/`.  
- Nuevas rutas para usuarios no autorizados:  
  - `/signup` → registro de usuarios.  
  - `/signin` → autorización de usuarios.  
- Los usuarios no autorizados deben ser redirigidos siempre a la página de inicio de sesión.  

---

## 2. Componentes de React
Se crean los siguientes componentes:

- **Login** → autorización de usuarios.  
- **Register** → registro de usuarios.  
- **ProtectedRoute** → protege la ruta `/` para que solo usuarios autorizados accedan.  
- **InfoTooltip** → ventana modal que informa si el registro fue exitoso.  

**Condiciones adicionales:**
- El encabezado debe variar según si el usuario está autorizado o no.  
- Se reutilizan formularios y ventanas modales para implementar los componentes.  
- La lógica de registro y autorización se centraliza en el archivo `auth.js` dentro de `/utils`.  

---

## 3. Conexión con backend de TripleTen
- URL base: `https://se-register-api.en.tripleten-services.com/v1`  
- Endpoints:  
  - `/signup` → registro.  
  - `/signin` → autorización.  
  - `/users/me` → validación de token y obtención de email.  
- Las solicitudes protegidas deben incluir el encabezado:  
  ```
  Authorization: Bearer {token}
  ```

---

## 4. Autenticación del usuario
### Registro (`/signup`)
- Método: POST  
- Encabezados: `Content-Type: application/json`  
- Cuerpo: email y contraseña.  
- Respuesta exitosa: datos del usuario con su ID.  
- Errores: `400` si algún campo es incorrecto.  

### Inicio de sesión (`/signin`)
- Método: POST  
- Encabezados: `Content-Type: application/json`  
- Cuerpo: email y contraseña.  
- Respuesta exitosa: token JWT.  
- Errores:  
  - `400` → campos faltantes.  
  - `401` → usuario no encontrado.  

### Validación de token (`/users/me`)
- Método: GET  
- Encabezados: `Authorization: Bearer {token}`  
- Respuesta exitosa: email e ID del usuario.  
- Errores:  
  - `400` → token no proporcionado o mal formateado.  
  - `401` → token inválido.  

---

## 5. Almacenamiento local y tokens
- Se utiliza **localStorage** para guardar el token JWT.  
- En visitas posteriores, se valida el token con `/users/me` para mantener la sesión activa.  

---

## 6. Seguridad
- Validar entradas de usuario y escapar caracteres peligrosos.  
- Usar **Content Security Policy (CSP)** para restringir recursos.  
- Almacenar tokens en cookies httpOnly en proyectos más grandes.  
- Implementar protección contra CSRF y ataques de fuerza bruta/DDOS.  

---

## 7. Diseño en Figma
- El encabezado y los formularios deben seguir el diseño de Figma.  
- Si hay problemas de acceso, se recomienda usar **Figma Desktop App** y descargar el archivo `.fig`.  

---

## 🚀 Instalación y uso

### Requisitos previos
- Node.js (versión recomendada: 16 o superior).  
- npm o yarn como gestor de paquetes.  
- Git instalado en tu máquina.  

### Pasos de instalación
1. Clonar el repositorio:  
   ```
   git clone https://github.com/tu-usuario/nombre-del-repo.git
   ```
2. Entrar en la carpeta del proyecto:  
   ```
   cd nombre-del-repo
   ```
3. Instalar dependencias:  
   ```
   npm install
   ```
   o  
   ```
   yarn install
   ```
4. Iniciar el servidor de desarrollo:  
   ```
   npm start
   ```
   o  
   ```
   yarn start
   ```
5. Abrir en el navegador:  
   ```
   http://localhost:3000
   ```

---

## 📌 Conclusión
Este proyecto integra registro, inicio de sesión, protección de rutas y almacenamiento seguro de tokens en React, conectado al backend de TripleTen. En próximos sprints se unificará con el backend de Express y se ampliará la funcionalidad.
