// Define el tamaño de la cuadrícula del juego (20x20 celdas)
const grid = [20, 20];

// Inicializa la serpiente como un array vacío
let snake = [];

// Define la posición inicial de la cabeza de la serpiente
let x = 9;
let y = 7;

// Establece el desplazamiento inicial hacia la derecha
let offSetX = 1;
let offSetY = 0;

// Guarda la dirección actual de la serpiente
let direccion = 'ArrowRight';

// Variables para la manzana (posición inicial)
let manzana;
let manzanaX = 3;
let manzanaY = 3;

// Variables para el puntaje y el récord
let puntos = 0; 

// Variable que indica si el juego ha terminado
let gameOver = false;

// Se ejecuta cuando la ventana carga completamente
window.onload = () => {
    // Obtiene referencias a los elementos del DOM
    window.board = document.getElementById('game_board'); // Tablero de juego
    window.mostrarGameOver = document.getElementById('game_over'); // Pantalla de Game Over
    window.rejugar = document.getElementById('rejugar'); // Botón para reiniciar

    // Elementos de la interfaz de puntaje
    window.mostrarPtos = document.getElementById('ptos');

    // Inicializa la cabeza de la serpiente y la manzana
    snake[0] = document.getElementById('snake');
    manzana = document.getElementById('manzana');

    // Establece un intervalo de actualización del juego cada 100 ms
    setInterval(() => {
        // Si el juego no ha terminado
        if (!gameOver) {
            // Mueve la cabeza de la serpiente en la dirección actual
            x += offSetX;
            y += offSetY;

            // Mueve cada segmento de la serpiente al lugar del segmento anterior
            for (let i = snake.length - 1; i > 0; i--) {
                snake[i].style.gridArea = snake[i - 1].style.gridArea;
            }

            // Actualiza la posición de la cabeza de la serpiente
            let newPos = `${y}/${x}`;
            snake[0].style.gridArea = newPos;

            // Verifica si la serpiente colisiona consigo misma
            let autoColision = checkAutoColision();

            // Verifica si la serpiente ha chocado con los bordes 
            if (x > grid[0] || x < 1 || y > grid[1] || y < 1 || autoColision) {
                gameOver = true;
                board.style.display = 'none'; // Oculta el tablero
                mostrarGameOver.style.display = 'grid'; // Muestra pantalla de Game Over
            }

            // Verifica si la serpiente ha comido la manzana
            if (x === manzanaX && y === manzanaY) {
                // Genera una nueva posición aleatoria para la manzana
                manzanaX = Math.floor(Math.random() * grid[0]) + 1;
                manzanaY = Math.floor(Math.random() * grid[1]) + 1;
                manzana.style.gridArea = `${manzanaY}/${manzanaX}`;

                // Agrega un nuevo segmento a la serpiente
                creaNuevoSegmento('div', 'class', 'sprite snake', newPos);

                // Aumenta el puntaje y lo muestra en pantalla
                puntos++;
                mostrarPtos.innerHTML = `Puntos: ${puntos}`;
            }
        }

    }, 140);
}

// Función para crear un nuevo segmento en la serpiente
function creaNuevoSegmento(tipoElemento, attr, nombreAttr, newPos) {
    let nuevoSegmento = document.createElement(tipoElemento); // Crea un nuevo elemento div
    nuevoSegmento.setAttribute(attr, nombreAttr); // Asigna la clase "sprite snake"
    nuevoSegmento.style.gridArea = newPos; // Ubica el nuevo segmento en la cuadrícula
    board.appendChild(nuevoSegmento); // Lo agrega al tablero de juego
    snake.push(nuevoSegmento); // Lo agrega al array de la serpiente
}

// Función para verificar si la serpiente choca consigo misma
function checkAutoColision() {
    for (i = 1; i < snake.length; i++) {
        if (snake[i].style.gridArea === snake[0].style.gridArea) {
            return true; // Retorna verdadero si hay colisión
        }
    }
    return false; // Retorna falso si no hay colisión
}

// Evento que escucha las teclas presionadas por el usuario
document.addEventListener('keydown', (event) => {
    console.log(event.key); 

    // Diccionario con las direcciones y sus restricciones
    let leerTecladoArray = {
        ArrowUp: [0, -1, 'ArrowDown'], // No puede moverse hacia abajo
        ArrowDown: [0, 1, 'ArrowUp'],  // No puede moverse hacia arriba
        ArrowLeft: [-1, 0, 'ArrowRight'], // No puede moverse a la derecha
        ArrowRight: [1, 0, 'ArrowLeft'] // No puede moverse a la izquierda
    };

    let teclaPulsada = event.key;

    // Si la tecla está en el diccionario de direcciones permitidas
    if (Object.keys(leerTecladoArray).includes(teclaPulsada)) {
        // Evita que la serpiente se mueva en dirección opuesta a la actual
        if (direccion != leerTecladoArray[teclaPulsada][2]) {
            offSetX = leerTecladoArray[teclaPulsada][0]; // Actualiza el desplazamiento en X
            offSetY = leerTecladoArray[teclaPulsada][1]; // Actualiza el desplazamiento en Y
            direccion = teclaPulsada; // Guarda la nueva dirección
        }
    }

    // Si se presiona Enter y el juego ha terminado, recarga la página
    if (teclaPulsada === 'Enter' && gameOver) location.reload();
});

// Evento que escucha los clics en la pantalla
document.addEventListener('click', (event) => {
    console.log(event.target.id); // Muestra en consola el ID del elemento clicado

    // Diccionario con las direcciones para controles táctiles o botones
    let clicksArray = {
        up: [0, -1, 'ArrowDown'],
        do: [0, 1, 'ArrowUp'],
        le: [-1, 0, 'ArrowRight'],
        ri: [1, 0, 'ArrowLeft'],
        up2: [0, -1, 'ArrowDown'],
        do2: [0, 1, 'ArrowUp'],
        le2: [-1, 0, 'ArrowRight'],
        ri2: [1, 0, 'ArrowLeft']
    };

    let clickBoton = event.target.id;

    // Si el clic corresponde a un botón de dirección permitido
    if (Object.keys(clicksArray).includes(clickBoton)) {
        // Evita que la serpiente se mueva en dirección opuesta a la actual
        if (direccion != clicksArray[clickBoton][2]) {
            offSetX = clicksArray[clickBoton][0]; // Actualiza el desplazamiento en X
            offSetY = clicksArray[clickBoton][1]; // Actualiza el desplazamiento en y
            direccion = clickBoton; // Guarda la nueva dirección
        }
    }

    // Si se hace clic en el botón "rejugar", recarga la página
    if (clickBoton === 'rejugar') location.reload();
});
