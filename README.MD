
# Aplicación Administrador de Tareas

## Descripción del proyecto

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

### Limites del sistema

  En esta primera versión, el usuario podrá gestionar:

-   El alta, baja y modificación de tareas
    
-   Cambiar el estado de las tareas
    
-   El listado, alta, baja y modificación de proyectos
    

Lo que no podrá gestionar en esta versión será:

-   El alta, baja y modificación de estados. El sistema empezará con 6 estados básicos: en análisis, para hacer, en progreso, en QA, en revisión, terminado
    
-   El alta, baja y modificación de usuarios y sus respectivos roles/permisos.

## Documentación de la API

Base URL: `http://localhost:3500/` <br /><br />

<b>Formato del body de respuesta</b>: `{error: boolean, data: object}` <br />
- El atributo error indicará con un booleano si la petición fue exitosa o no. <br />
- El atributo data contendrá los datos de respuesta en caso de éxito o una descripción del error si hay una falla.

<b>Tareas (Tickets)</b> <br />
- <b>GET</b> `/tickets` <br />
<i>Descripción</i>: obtener todos los tickets.<br />
<i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al traer todos los tickets
  204: no hay tickets para mostrar
  ```

- <b>GET</b> `/tickets/{id}` <br />
<i>Descripción</i>: obtener todos los atributos de ticket en específico.<br />
<i>Parámetros</i>:
  ```
  id: {number} | ID del ticket
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al traer un ticket
  404: no existe el ticket solicitado
  ```

- <b>GET</b> `/tickets/proyect/{id}` <br />
<i>Descripción</i>: obtener todos los tickets asociados a un proyecto.<br />
<i>Parámetros</i>:
  ```
  id: {number} | ID del proyecto
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al traer los tickets
  204: no hay ningún ticket asociado a dicho proyecto
  ```

- <b>GET</b> `/tickets/status/{id}` <br />
<i>Descripción</i>: obtener todos los tickets que estén en un estado en específico.<br />
<i>Parámetros</i>:
  ```
  id: {number} | ID del estado
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al traer los tickets
  204: no hay ningún ticket asociado a dicho estado
  ```

- <b>POST</b> `/tickets` <br />
<i>Descripción</i>: crea un ticket
<i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Formato del body a enviar</i>: 
  ```
  {"title": "titulo", "date_created": "unix_time", "user": "usuario", "description": "descripcion", "proyect": "proyecto"}
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  201: éxito al crear el ticket
  404: no existe el ticket solicitado
  422: no es posible crear el ticket debido a que le faltan datos o son incorrectos
  ```

- <b>PUT</b> `/tickets/{id}` <br />
<i>Descripción</i>: actualiza los atributos de un ticket.
<i>Parámetros</i>:
  ```
  id: {number} | ID del ticket a modificar
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Formato del body a enviar</i>: 
  ```
  {"title": "titulo", "user": "usuario", "description": "descripcion", "proyect": "proyecto"}
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al actualizar el ticket
  404: no existe el ticket a actualizar
  ```

- <b>PATCH</b> `/tickets/{id}` <br />
<i>Descripción</i>: actualiza el estado de un ticket.
<i>Parámetros</i>:
  ```
  id: {number} | ID del ticket a modificar
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Formato del body a enviar</i>: 
  ```
  {"estado": "estado"}
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al actualizar el ticket
  403: no es permitido el cambio de estado
  404: no existe el ticket
  ```

- <b>DELETE</b> `/tickets/{id}` <br />
<i>Descripción</b>: elimina un ticket.
<i>Parámetros</i>:
  ```
  id: {number} | ID del ticket a eliminar
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al eliminar el ticket
  404: no existe el ticket a eliminar
  ```

<hr />

<b>Proyectos (Proyects)</b> <br />

- <b>GET</b> `/proyects` <br />
<i>Descripción</i>: obtener todos los proyectos.
<i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al traer todos los proyectos
  204: no hay proyectos para mostrar
  ```

- <b>GET</b> `/proyects/{id}` <br />
<i>Descripción</i>: obtener todos los atributos de un proyecto.
<i>Parámetros</i>:
  ```
  id: {number} | ID del proyecto
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al traer un proyecto
  404: no existe el proyecto solicitado
  ```

- <b>POST</b> `/proyects` <br />
<i>Descripción</i>: crea un proyecto.<br />
<i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Formato del body a enviar</i>: 
  ```
  {"name": "nombre"}
  ```
  
  <i>Códigos de estado de respuesta</i>:
  ```
  201: éxito al crear un proyecto
  422: no es posible crear el proyecto debido a que le faltan datos o son incorrectos
  ```

- <b>PUT</b> `/proyects/{id}` <br />
<i>Descripción</i>: actualizar los datos del proyecto.<br />
<i>Parámetros</i>:
  ```
  id: {number} | ID del proyecto a modificar
  ```
  <i>Formato del body a enviar</i>: 
  ```
  {"name": "nombre"}
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al actualizar un proyecto
  404: no existe el proyecto a actualizar
  ```

- <b>DELETE</b> `/proyects/{id}` <br />
<i>Descripción</i>: elimina un proyecto. <br />
<i>Parámetros</i>:
  ```
  id: {number} | ID del proyecto a eliminar
  ```
  <i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al eliminar un proyecto
  403: no se puede borrar el proyecto porque tiene tickets asociados
  404: no existe el proyecto a eliminar
  ```

<hr />

<b>Estados (Statuses)</b> <br />

- <b>GET</b> `/statuses` <br />
<i>Descripción</i>: obtener todos los estados posibles para los tickets.
<i>Cabeceras</i>:
  ```
  Accept: application/json
  Content-type: application/json
  ```
  <i>Códigos de estado de respuesta</i>:
  ```
  200: éxito al traer todos los estados
  204: no hay estados para mostrar
  ```

<hr />

<b>Códigos de respuesta para errores genéricos</b> <br /> 
- Caída de la base de datos, error en tiempo de ejecución: 500 <br />
- Entidad inexistente o verbo no implementado: 404

## Configuración inicial
