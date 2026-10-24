PokéDex Explorer

App hecha con Expo y React Native que consume la PokéAPI. Lista Pokémon,
permite buscarlos por nombre o número y muestra su ficha con imagen, tipos
y estadísticas.

Estructura de carpetas

    pokedex-explorer/
    App.js
    README.md
    src/
        api/
        components/
        screens/

Responsabilidad de cada pieza

App.js: punto de entrada. Decide qué vista se muestra (lista o detalle)
y conecta las pantallas con la capa de red.
src/api/: capa de red. Contiene las funciones que consumen la PokéAPI
(lista paginada y ficha por nombre o id). No contiene JSX ni estilos.
src/components/: piezas reutilizables de interfaz, como la tarjeta de
Pokémon. No hacen llamadas a la API.
src/screens/: las dos vistas de la app, la lista y el detalle, con sus
estados de cargando, error, sin resultados y éxito.

Por qué se organizó así

La regla del taller es que las llamadas a la API no queden mezcladas con los
estilos y el JSX. Por eso la lógica de red vive sola en src/api/, y la
interfaz se reparte entre components/ y screens/. Así cada archivo tiene una sola responsabilidad: si cambia la API solo se toca api/, y si cambia el diseño no se toca la red.