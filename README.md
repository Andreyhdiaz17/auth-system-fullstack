# Auth System Fullstack 🔐

Sistema completo de autenticación con JWT usando Spring Boot y React.

## Tecnologías
### Backend
- Java 17 + Spring Boot 3.5
- Spring Security 6 + JWT
- PostgreSQL + JPA/Hibernate
- BCrypt, Lombok, Maven

### Frontend
- React 18 + Vite
- React Router DOM
- Axios con interceptores

## Funcionalidades
- ✅ Registro de usuarios con contraseña encriptada (BCrypt)
- ✅ Login con generación de JWT Token
- ✅ Dashboard protegido por autenticación
- ✅ Redirección automática sin token
- ✅ Roles de usuario (ROLE_USER, ROLE_ADMIN)
- ✅ Cierre de sesión

## Cómo ejecutar
### Backend
1. Crear BD: `CREATE DATABASE auth_system_db`
2. Configurar credenciales en `application.properties`
3. Ejecutar con IntelliJ o `mvn spring-boot:run`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Abrir `http://localhost:5173`
