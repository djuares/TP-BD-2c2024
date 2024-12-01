# TP-BD-2c2024

# Trabajo Práctico Base de Datos

## Integrantes
1. Antonella Briglia 
2. Juan Martín Muñoz
3. Marcos García Neira 110363
4. 
5. 

---

## Instrucciones para correr el proyecto

Este proyecto está dividido en dos partes principales: **Frontend** y **Backend**. Para que la aplicación funcione correctamente, es necesario ejecutar ambas partes siguiendo los pasos que se detallan a continuación:

### Requisitos previos
1. Tener instalado **Node.js** (versión recomendada: 18 o superior).
2. Tener instalado un gestor de paquetes como **npm** o **yarn**.

---

### Pasos para ejecutar

1. **Backend**
   - Abrir una terminal y navegar hasta la carpeta `backend`.
   - Ejecutar los siguientes comandos:
     ```bash
     npm install
     npm start
     ```
   - Esto iniciará el servidor del backend en http://localhost:3001

2. **Frontend**
   - Abrir una nueva terminal y navegar hasta la carpeta `frontend`.
   - Ejecutar los siguientes comandos:
     ```bash
     npm install
     npm run dev
     ```
   - Esto iniciará el servidor del frontend y abrirá automáticamente la aplicación en el navegador en http://localhost:5173

---

### Rutas de la API

GET	api/alumnos	Obtener la lista de todos los alumnos.
POST	api/alumnos	Crear un nuevo alumno.
PUT	api/alumnos/:padron	Actualizar un alumno por su padrón.
DELETE	api/alumnos/:padron	Eliminar un alumno por su padrón.

GET	api/sql/alumnos	Obtener la lista de todos los alumnos.
POST	api/sql/alumnos	Crear un nuevo alumno.
PUT	api/sql/alumnos/:padron	Actualizar un alumno por su padrón.
DELETE	api/sql/alumnos/:padron	Eliminar un alumno por su padrón.
