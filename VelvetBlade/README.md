# Velvet & Blade — Proyecto corregido

## Qué estaba roto y qué se corrigió

1. **Faltaban los archivos de configuración del frontend** (`package.json`, `angular.json`,
   `tsconfig*.json`, `ionic.config.json`, `karma.conf.js`). El zip original solo traía las
   carpetas `src/` y `backend/`, así que el proyecto Angular/Ionic no se podía ni instalar
   ni ejecutar. Ya están creados y probados.

2. **Import roto de Ionic**: 13 archivos importaban `@ionic/angular/lazy`, un subpath que
   ya no existe en la versión actual de `@ionic/angular` (8.8.x). Esto hacía fallar la
   compilación por completo. Se cambió a `@ionic/angular` en todos los módulos.

3. **El guard de login no se usaba**: existía `auth-guard.ts` pero ninguna ruta lo
   aplicaba, así que se podía entrar a `/servicios`, `/reservar-cita`, `/historial`, etc.
   sin haber iniciado sesión. Ya se aplicó `canActivate: [authGuard]` a todas las rutas
   que requieren sesión.

4. **Botón de perfil roto**: en la pantalla de servicios, el botón de perfil navegaba a
   `/perfil`, una ruta que no existe en la app. Se redirigió temporalmente a `/historial`
   (dejé una nota en el código — cuando crees la página de perfil, solo hay que cambiar
   esa línea en `servicios.page.ts`).

El backend (Node/Express, con los datos en archivos JSON dentro de `backend/data`) ya
funcionaba correctamente — lo probé end-to-end (crear cuenta, login, listar servicios y
profesionales, verificar disponibilidad, crear cita, listar historial) y no necesitó
cambios.

## Cómo correrlo

### 1. Backend (API REST, puerto 3000)

```bash
cd backend
npm install     # si no tienes ya node_modules
npm start
```

Debe imprimir: `Servidor Velvet & Blade escuchando en http://localhost:3000`

### 2. Frontend (Ionic/Angular, puerto 8100)

Desde la raíz del proyecto (no desde `backend/`):

```bash
npm install
npx ionic serve
```

o, si no tienes Ionic CLI global instalado, con Angular CLI directamente:

```bash
npm install
npx ng serve
```

Abre `http://localhost:8100`. Asegúrate de que el backend (paso 1) esté corriendo al
mismo tiempo — el frontend le habla en `http://localhost:3000/api` (configurable en
`src/environments/environment.ts`).

## Flujo funcional verificado

- Crear cuenta → `/registro`
- Iniciar sesión → `/login`
- Seleccionar un servicio → `/servicios`
- Elegir especialista, fecha y verificar disponibilidad → `/reservar-cita`
- Crear la cita (bloquea horarios ya ocupados) → `/reservar-cita`
- Ver historial de citas y cancelarlas → `/historial`

El almacenamiento de sesión y caché de datos (usuario logueado, servicios,
profesionales, citas) usa `@ionic/storage-angular`, ya registrado correctamente en
`app.module.ts`.

## Pendientes que noté (no bloquean el funcionamiento, pero conviene limpiar)

Hay páginas duplicadas o sin terminar que no forman parte del flujo activo:
`seleccion-servicio`, `historial-citas`, `horario-disponibilidad`, `horarios`, y una
carpeta duplicada `src/app/pages/pages/servicios` que no se usa en ningún lado. No
rompen la app, pero te recomiendo borrarlas (y sus rutas en `app-routing.module.ts`)
para evitar confusión a futuro.
