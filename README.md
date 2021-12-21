# Plusiam_2

Se puede usar cualquier servidor locar. El pograma está escrito en vanilla javascript con un poco de html que contine toda la lógica.

Yo uso como servidor local para hacer pruebas http-server. Sólo se necesita tener instalado node y npm. En una terminal escribir:

npm install --global http-server

Una vez instaldo http-server, dirigirse en una temrinal a la carpeta donde se haya instalado el proyecto y en la misma carpeta que donde se encunetre el archivo index.html escribir:

http-server -o

Esto abrirá el navegador predeterminado y ejecutará el juego (prototipo).

# COSAS QUE QUEDAN POR HACER PARA EL PMV

- Despliegue provisional en codesandbox o netlify (1 Semana)
- Añadir sonidos (Recuperar sonidos del primer Plusiam - 1 Semana)
- Añadir tutorial (2 Semanas - Antes del 26 de enero de 2022)
- Despliegue del juego en itch.io (1 Semana - Antes del 2 de febrero de 2022)

# POSIBLES MEJORAS AL PMV

- Mejorar la mecánica. Actualmente la mecánica del juego basada en clics no me termina de convencer. La mecánica original de seleccionar  tres piezas consecutivas sin levantar el dedo me gusta más. (2 semanas) Debido a la complejidad que estaba generando el arrastrar el dedo sobre la versión móvil se propone este punto como mejora.
- Añadir Hall of Fame en back (La puntuación se almacena en un VPS ó Heroku) (2 Semanas)
- Añadir Hall of Fame en front (El jugador compite contra su mejor puntación almacenada en LocalStorage) (1 Semana)

# PUNTOS TERMINADOS
- Se calculan las combinaciones restantes después de que el jugador complete un match.
- Detectar y crear un panel de bloques nuevo cuando no quedan más combinaciones y añadir puntuación (Qué es un juego sin puntuaciones!!).
- Añadir cuenta atrás para Game Over.
- Añadir menus