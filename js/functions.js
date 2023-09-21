// -----------------------------------------------------------------------
//  Funciones
// -----------------------------------------------------------------------
import { settings, headSnake, snake, manzana } from "./constants.js";

export function creaNuevoSegmento(tipoElemento, attr, nombreAttr, newPos) {
    let nuevoSegmento = document.createElement(tipoElemento);
    nuevoSegmento.setAttribute(attr, nombreAttr);
    nuevoSegmento.style.gridArea = newPos;
    board.appendChild(nuevoSegmento);
    snake.snake.push(nuevoSegmento);
}

export function checkAutoColision() {
    for (let i = 1; i < snake.snake.length; i ++) {
        if (snake.snake[i].style.gridArea === snake.snake[0].style.gridArea) {
            return true;
        }
    }

    return false;
}

export function reJugar() {
    snake.snake = [];
    snake.snake.push(document.getElementById('snake'));
    settings.puntos = 0;
    settings.gameOver = false;

    headSnake.x = 9;
    headSnake.y = 7;
    headSnake.offSetX = 1;
    headSnake.offSetY = 0;
    headSnake.direccion = 'ArrowRight';

    manzana.x = Math.floor(Math.random() * settings.grid[0]) + 1;
    manzana.y = Math.floor(Math.random() * settings.grid[1]) + 1;
}
