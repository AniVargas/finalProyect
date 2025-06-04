# Work in progress

Work in progres es una aplicacion que te permite ordenar tu flujo de trabajo en el día a día llevando un control del gestion de tus tareas. La aplicacion te permite agregar tareas por hacer, poner fecha limite a tus tareas (para tener un recordatorio visual de la fecha de entrega) y clasificar tus tareas en: por hacer, haciendo y hecho. 

## Setup usado en el proyecto 

[VSCode](https://code.visualstudio.com/) 
- Vue
- Pinia
- Vue Router
- Supabase

## Comenzando a usar el proyecto 🚀

- Haz fork al repo
- Clona el repo

   ```bash
  $ cd finalProyect
  $ npm install
  $ npm run dev --- para visualuzar tu proyecto
  ```

## Estuctura del proyecto 🏗️

El proyecto actual consta de 3 rutas: LogIn, SignIn y Dashboard/ToDo + un component: navbar. 
Los estilos estan definidos internamente en cada fichero

El estado global se maneja con pinia, haciendo usos de dos stores: user y toDoList 

  User store define las funciones: 
  - fetchUser
  - singUp
  - logIn
  - logout

  toDolist store defiene las funciones: 
  - tasks
  - createTask
  - fetchTasks
  - changeStatus
  - delTask
  - modifyTask

Las stores hacen un llamado a la api de supabase definidas en los ficheros /src/api/supabase/ [index][taskApi] 

## Posibilidades de desarrollo sugeridas 👩‍💻

Authentication: 
- SignUp with: (gmail, etc).
- Mejorar mensajes de error para hacerlos más especificos.

Dashboard: 
- Tener mas de una to Do list
- Crear mensajes de felicistaciones al pasar una tarea a done
- Hace un contador de tareas en cada lista de tareas
- Poner filtro y ordenación a las task

Código: 
- Crear un css global
- Refactorizar para optimizar el código  



---
⌨️ con ❤️ por [Ana Vargas ](https://github.com/AniVargas) 😊



