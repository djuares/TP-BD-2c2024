# TP-BD-2c2024

## Frontend

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Backend

### Iniciar el servidor

Para iniciar el servidor en modo desarrollo:

```sh
npm run dev
```

Para iniciar el servidor en modo producción:

```sh
npm start
```

El servidor estará disponible en http://localhost:3001.

### Rutas de la API

GET	/alumnos	Obtener la lista de todos los alumnos.
POST	/alumnos	Crear un nuevo alumno.
PUT	/alumnos/:padron	Actualizar un alumno por su padrón.
DELETE	/alumnos/:padron	Eliminar un alumno por su padrón.