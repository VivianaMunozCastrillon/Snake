// --------------------------------------------------------
//  Snake (css - grid)
// --------------------------------------------------------
const grid = [20, 20];

let snake = [];
let x = 9;
let y = 7;
let offSetX = 1;
let offSetY = 0;
let direccion = 'ArrowRight';

let manzana;
let manzanaX = 3;
let manzanaY = 3;

let puntos = 0;
let record = 0;

let gameOver = false;

window.onload = () => {
    window.board = document.getElementById('game_board');
    window.mostrarGameOver = document.getElementById('game_over');
    window.rejugar = document.getElementById('rejugar');

    window.mostrarPtos = document.getElementById('ptos');
    window.mostrarHi = document.querySelector('.score__board hi');

    snake[0] = document.getElementById('snake');
    manzana = document.getElementById('manzana');

    setInterval(() => {
        if (!gameOver) {
            x += offSetX;
            y += offSetY;

            for (let i = snake.length - 1; i > 0; i --) {
                snake[i].style.gridArea = snake[i - 1].style.gridArea;
            }

            let newPos = `${y}/${x}`;
            snake[0].style.gridArea = newPos;

            let autoColision = checkAutoColision();

            if (x > grid[0] || x < 1 || y > grid[1] || y < 1 || autoColision) {
                gameOver = true;
                board.style.display = 'none';
                mostrarGameOver.style.display = 'grid';
            }

            if (x === manzanaX && y === manzanaY) {
                manzanaX = Math.floor(Math.random() * grid[0]) + 1;
                manzanaY = Math.floor(Math.random() * grid[1]) + 1;
                manzana.style.gridArea = `${manzanaY}/${manzanaX}`;

                creaNuevoSegmento('div', 'class', 'sprite snake', newPos);

                puntos ++;
                mostrarPtos.innerHTML = `Puntos: ${puntos}`;
            }
        }

    }, 100);
}

function creaNuevoSegmento(tipoElemento, attr, nombreAttr, newPos) {
    let nuevoSegmento = document.createElement(tipoElemento);
    nuevoSegmento.setAttribute(attr, nombreAttr);
    nuevoSegmento.style.gridArea = newPos;
    board.appendChild(nuevoSegmento);
    snake.push(nuevoSegmento);
}

function checkAutoColision() {
    for (i = 1; i < snake.length; i ++) {
        if (snake[i].style.gridArea === snake[0].style.gridArea) {
            return true;
        }
    }

    return false;
}

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

        if (direccion != leerTecladoArray[teclaPulsada][2]) {
            offSetX = leerTecladoArray[teclaPulsada][0];
            offSetY = leerTecladoArray[teclaPulsada][1];
            direccion = teclaPulsada;
        }
    }

    if (teclaPulsada === 'Enter' && gameOver) location.reload();
});

document.addEventListener('click', (event) => {
    console.log(event.target.id);

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

        if (direccion != clicksArray[clickBoton][2]) {
            offSetX = clicksArray[clickBoton][0];
            offSetY = clicksArray[clickBoton][1];
            direccion = clickBoton;
        }
    }

    if (clickBoton === 'rejugar') location.reload();
});

