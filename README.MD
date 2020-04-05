
# Aplicación Administrador de Tareas

## Descripción del alcance

El propósito de este proyecto es la creación de una aplicación para administrar las tareas de un equipo de trabajo. 
Para ello, el sistema estará compuesto de:

-   Frontend: aplicación en React para mostrar el tablero con las tareas y una sección para gestionar cada tarea: crear, editar y borrar.
    
-   Backend: API en Node para realizar las distintas acciones permitidas sobre las entidades del sistema.
    
-   Base de datos: MongoDB para almacenar las distintas entidades con todos sus datos.

Las entidades que presentará el sistema son las siguientes:

-   Tarea
    
-   Proyecto
    
-   Estado
    
-   Usuario
    
Las propiedades de cada una de ellas serán:

-   Tarea: id, numero, titulo, fecha_creacion, estado, usuario, descripcion, proyecto
    
-   Proyecto: id, nombre
    
-   Estado: id, nombre
    
-   Usuario: id, nombre, apellido, email

## API endpoints

Base URL: `http://localhost:3500/` <br /><br />

Tareas (Tickets) <br />
- GET `/tickets` (Obtener todos los tickets).<br />
Status code: 200 (éxito al traer todos los tickets) | 500 (error al traer todos los tickets) <br />
Accept: `application/json` <br />
Content-type: `application/json`
- GET `/tickets/{id}` (Obtener todos los detalles de ticket en específico).<br />
Status code: 200 (éxito al traer un ticket) | 404 (no existe el ticket solicitado) | 500 (error al traer el ticket) <br />
Param id: {number} | ID del ticket <br />
Accept: `application/json` <br />
Content-type: `application/json`
- POST `/tickets` (Crea un ticket).<br />
Status code: 201 (éxito al crear un ticket) | 500 (error al crear el ticket) <br />
Body: {"title": "titulo", "date_created": "fecha_creacion", "user": "usuario", "description": "descripcion", "proyect": "proyecto"} <br />
Accept: `application/json` <br />
Content-type: `application/json`
- PUT `/tickets/{id´}` (Actualiza los datos del ticket).<br />
Status code: 200 (éxito al actualizar un ticket) | 404 (no existe el ticket a actualizar) | 500 (error al actualizar el ticket) <br />
Param id: {number} | ID del ticket <br />
Body: {"title": "titulo", "user": "usuario", "description": "descripcion", "proyect": "proyecto"} <br />
Accept: `application/json` <br />
Content-type: `application/json`
- PATCH `/tickets/{id}` (Actualiza el estado de un ticket).<br />
Status code: 200 (éxito al actualizar el estado de un ticket) | 404 (no es posible cambiar al estado especificado) | 500 (error al actualizar el estado del ticket) <br />
Param id: {number} | ID del ticket <br />
Body: {"estado": "estado"} <br />
Accept: `application/json` <br />
Content-type: `application/json`
- DELETE `/tickets/{id}` (Elimina un ticket).<br />
Status code: 200 (éxito al eliminar el estado de un ticket) | 404 (no existe el ticket a eliminar) | 500 (error al eliminar el ticket) <br />
Param id: {number} | ID del ticket <br />
Accept: `application/json` <br />
Content-type: `application/json`

Proyectos (Proyects) <br />
- GET `/proyects` (Obtener todos los proyectos).<br />
Status code: 200 (éxito al traer todos los proyectos) | 500 (error al traer todos los proyectos) <br />
Accept: `application/json` <br />
Content-type: `application/json`
- GET `/proyects/{id}` (Obtener todos los detalles de proyecto en específico).<br />
Status code: 200 (éxito al traer un proyecto) | 404 (no existe el proyecto solicitado) | 500 (error al traer el proyecto) <br />
Param id: {number} | ID del proyecto <br />
Accept: `application/json` <br />
Content-type: `application/json`
- POST `/proyects` (Crea un proyecto).<br />
Status code: 201 (éxito al crear un proyecto) | 500 (error al crear el proyecto) <br />
Body: {"name": "nombre"} <br />
Accept: `application/json` <br />
Content-type: `application/json`
- PUT `/proyects/{id´}` (Actualiza los datos del proyecto).<br />
Status code: 200 (éxito al actualizar un proyecto) | 404 (no existe el proyecto a actualizar) | 500 (error al actualizar el proyecto) <br />
Param id: {number} | ID del proyecto <br />
Body: {"name": "nombre"} <br />
Accept: `application/json` <br />
Content-type: `application/json`
- DELETE `/proyects/{id}` (Elimina un proyecto).<br />
Status code: 200 (éxito al eliminar un proyecto) | 404 (no existe el proyecto a eliminar) | 500 (error al wliminar el proyecto) <br />
Param id: {number} | ID del proyecto <br />
Accept: `application/json` <br />
Content-type: `application/json`

Estados (Statusses) <br />
- GET `/statusses` (Obtener todos los estados posibles para los tickets).<br />
Status code: 200 (éxito al traer todos los estados) | 500 (error al traer todos los estados) <br />
Accept: `application/json` <br />
Content-type: `application/json`

### Limites del sistema

  En esta primera versión, el usuario podrá gestionar:

-   El alta, baja y modificación de tareas
    
-   Cambiar el estado de las tareas
    
-   El listado, alta, baja y modificación de proyectos
    

Lo que no podrá gestionar en esta versión será:

-   El alta, baja y modificación de estados. El sistema empezará con 4 estados básicos: en análisis, para hacer, en progreso, en QA, en revisión, terminado
    
-   El alta, baja y modificación de usuarios y sus respectivos roles/permisos.
    
