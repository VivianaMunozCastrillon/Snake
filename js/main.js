// ----------------------------------------------------------------
//  Snake (css - grid)
// ----------------------------------------------------------------
import { settings, headSnake, snake, manzana } from './constants.js';

import { 
    creaNuevoSegmento, 
    checkAutoColision, 
    reJugar 
} from './functions.js';

// ---------------------------------------------------------------
window.onload = () => {
    window.board = document.getElementById('game_board');
    window.mostrarGameOver = document.getElementById('game_over');
    window.rejugar = document.getElementById('rejugar');

    window.mostrarPtos = document.getElementById('ptos');
    window.mostrarHi = document.querySelector('.score__board hi');

    snake.snake.push(document.getElementById('snake'));
    window.manzanaDom = document.getElementById('manzana');

    setInterval(() => {
        if (!settings.gameOver) {
            headSnake.x += headSnake.offSetX;
            headSnake.y += headSnake.offSetY;

            for (let i = snake.snake.length - 1; i > 0; i --) {
                snake.snake[i].style.gridArea = snake.snake[i - 1].style.gridArea;
            }

            let newPos = `${headSnake.y}/${headSnake.x}`;
            snake.snake[0].style.gridArea = newPos;

            let autoColision = checkAutoColision();

            if (headSnake.x > settings.grid[0] || headSnake.x < 1 || headSnake.y > settings.grid[1] || headSnake.y < 1 || autoColision) {
                settings.gameOver = true;
                board.style.display = 'none';
                mostrarGameOver.style.display = 'grid';
            }

            if (headSnake.x === manzana.x && headSnake.y === manzana.y) {
                manzana.x = Math.floor(Math.random() * settings.grid[0]) + 1;
                manzana.y = Math.floor(Math.random() * settings.grid[1]) + 1;
                manzanaDom.style.gridArea = `${manzana.y}/${manzana.x}`;

                creaNuevoSegmento('div', 'class', 'sprite snake', newPos);

                settings.puntos ++;
                mostrarPtos.innerHTML = `Puntos: ${settings.puntos}`;
            }
        }

    }, 100);
}

// ---------------------------------------------------------------------
document.addEventListener('keydown', (event) => {
    console.log(event.key);

    let leerTecladoArray = {
        ArrowUp: [0, -1, 'ArrowDown'],
        ArrowDown: [0, 1, 'ArrowUp'],
        ArrowLeft: [-1, 0, 'ArrowRight'],
        ArrowRight: [1, 0, 'ArrowLeft']
    };

    let teclaPulsada = event.key;

    if (Object.keys(leerTecladoArray).includes(teclaPulsada)) {

        if (headSnake.direccion != leerTecladoArray[teclaPulsada][2]) {
            headSnake.offSetX = leerTecladoArray[teclaPulsada][0];
            headSnake.offSetY = leerTecladoArray[teclaPulsada][1];
            headSnake.direccion = teclaPulsada;
        }
    }

    if (teclaPulsada === 'Enter' && settings.gameOver) reJugar();
});

// --------------------------------------------------------------------
document.addEventListener('click', (event) => {
    console.log(event.target.id);
    console.log(snake.snake);

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

    if (Object.keys(clicksArray).includes(clickBoton)) {

        if (headSnake.direccion != clicksArray[clickBoton][2]) {
            headSnake.offSetX = clicksArray[clickBoton][0];
            headSnake.offSetY = clicksArray[clickBoton][1];
            headSnake.direccion = clickBoton;
        }
    }

    if (clickBoton === 'rejugar') reJugar();
});

