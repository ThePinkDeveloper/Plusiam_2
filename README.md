# Plusiam

Se puede usar cualquier servidor locar. El programa está escrito en vanilla javascript, con un poco de html y css, que contine toda la lógica.

Yo uso como servidor local para hacer pruebas http-server. Sólo se necesita tener instalado node y npm. En una terminal escribir:

npm install --global http-server

Una vez instaldo http-server, dirigirse en una temrinal a la carpeta donde se haya instalado el proyecto y en la misma carpeta que donde se encunetre el archivo index.html escribir:

http-server -o

Esto abrirá el navegador predeterminado y ejecutará el juego (prototipo).

# AÑADIDO EN ESTA ACTUALIZACION

Se corrige un bug por el que producía una desinsocrización en los sonidos al cargarse estos cada vez que se producía un sonido. Ahora todos los sonidos se cargan en memoria antes de usarse.

# AÑADIDO EN ACTUALIZACIONES ANTERIORES

- Se añaden sonidos
- Se arregla un bug por el que había que recargar la página para poder jugar desde la pantalla de Game Over ( Gracias Tere y Sergi por reportarlo ;) )
- Arreglo de bugs menores

# COSAS QUE QUEDAN POR HACER PARA EL MVP

- Añadir tutorial
- Modo ZEN (Misma mecánica sin limete de tiempo, sacar combinaciones por placer)
- Despliegue del juego en producción

# POSIBLES MEJORAS AL MVP

- Añadir Hall of Fame en back (Crear servidor de node en replit.com)