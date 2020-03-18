
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
    
### Limites del sistema

  En esta primera versión, el usuario podrá gestionar:

-   El alta, baja y modificación de tareas
    
-   Cambiar el estado de las tareas
    
-   El listado, alta, baja y modificación de proyectos
    

Lo que no podrá gestionar en esta versión será:

-   El alta, baja y modificación de estados. El sistema empezará con 4 estados básicos: en revisión, para hacer, en progreso, en QA, terminado
    
-   El alta, baja y modificación de usuarios y sus respectivos roles/permisos.
    
