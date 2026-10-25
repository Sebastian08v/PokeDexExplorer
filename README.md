# PokéDex Explorer

App hecha con Expo y React Native que consume la [PokéAPI](https://pokeapi.co/). Lista Pokémon, permite buscarlos por nombre o número y muestra su ficha con imagen, tipos y estadísticas.

## Cómo ejecutarlo

Requisitos: Node.js y la app Expo Go en el celular (o un simulador de iOS o un emulador de Android).

1. Instalar las dependencias:
   npm install

2. Iniciar el proyecto:
   npx expo start


3. Abrir la app: escanear el QR con Expo Go

## Estructura de carpetas

pokedex-explorer/
├── App.js
├── README.md
└── src/
    ├── api/
    │   └── pokeapi.js
    ├── components/
    │   ├── PokemonCard.js
    │   ├── StatBar.js
    │   └── TypeBadge.js
    ├── navigation/
    │   └── StackNavigator.js
    └── screens/
        ├── PokemonDetailScreen.js
        └── PokemonListScreen.js

Responsabilidad de cada archivo

Raíz

- App.js: punto de entrada. Solo renderiza el navegador.

src/api/: capa de red

- pokeapi.js: contiene las dos funciones que consumen la PokéAPI: la lista paginada y la ficha por nombre o id. Es el único archivo que usa `fetch`.

src/components/`: piezas reutilizables de interfaz

No hacen llamadas a la API.

- PokemonCard.js: tarjeta de la lista, con imagen, número de 3 dígitos y nombre.
- TypeBadge.js: distintivo de tipo, con su nombre en español y un color propio por tipo.
- StatBar.js: una estadística base con su valor y una barra de ancho proporcional (máximo 255).

src/screens/: las dos vistas de la app

- PokemonListScreen.js: vista de lista. Incluye la barra de búsqueda, la cuadrícula de 2 columnas con scroll infinito y los estados de cargando, error y éxito.
- PokemonDetailScreen.js: vista de detalle. Muestra imagen, tipos, altura, peso y estadísticas, con los estados de cargando, error, sin resultados y éxito.

src/navigation/: navegación

- StackNavigator.js: define el stack con las dos pantallas (lista y detalle) y la navegación entre ellas.

Por qué se organizó así

La regla del taller es que las llamadas a la API no queden mezcladas con los estilos y el JSX. Por eso la lógica de red vive sola en src/api/, y la interfaz se reparte entre components/ y screens/. Así cada archivo tiene una sola responsabilidad: si cambia la API solo se toca api/, y si cambia el diseño no se toca la red.

Dentro de la interfaz, las pantallas manejan el estado y los estados de la interfaz (cargando, error, sin resultados y éxito), mientras que los componentes solo dibujan lo que reciben por props. La navegación vive en su propia carpeta para que App.js quede mínimo y el cambio de pantallas se configure en un solo lugar.
