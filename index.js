/**
 * Created by das953 on 15.02.17.
 */
"use strict";

//./node_modules/webpack/bin/webpack.js



function initialize() {

    require('./app');


    let Snake = require('./app/models/snakeModel');
    let snake = new Snake();
    let game = require('./app/controllers/snakeController');


    game.initSnake(snake.list);

    document.getElementsByTagName('BODY')[0].addEventListener('keydown', bodyKeyDown);
    document.getElementById('btnStart').addEventListener('click', startGame);
    document.getElementById('btnClear').addEventListener('click', clearField);

    document.getElementById('Fsize').innerHTML = ` ${game.fieldSize} x ${game.fieldSize}`;
    document.getElementById('Ssize').innerHTML = ` ${snake.list.getLength()}`;
    document.getElementById('Fcount').innerHTML = (game.fieldSize * game.fieldSize).toString();

    let move, food;



    function bodyKeyDown(e) {


        /*
        * left  - a - num 4
        * up    - w - num 8
        * right - d - num 6
        * down  - s - num 2
        * */
        if(e.keyCode === 100 || e.keyCode === 37 || e.keyCode === 65){
            snake.sidePos[0]=1;
        }
        else if(e.keyCode === 104 || e.keyCode === 38 || e.keyCode === 87){
            snake.sidePos[0]=2;

        }
        else if(e.keyCode === 102 || e.keyCode === 39 || e.keyCode === 68){
            snake.sidePos[0]=3;

        }
        else if(e.keyCode === 98 || e.keyCode === 40 || e.keyCode === 83){
            snake.sidePos[0]=4;

        }

    }

    function startGame() {


        if(snake.onGame === 0) {

                snake.onGame = 1;
                move = snake.moveInterval(game, 500);
                food = snake.foodInterval(game, 5000);

        }


    }

    function clearField() {


        if(snake.onGame !== 0) {

            let field = document.getElementById('Field');

            while (field.firstChild){
                field.removeChild(field.firstChild);

            }

            clearInterval(move);
            clearInterval(food);

            snake = new Snake();
            game.initSnake(snake.list);
            document.getElementById('Ssize').innerHTML = ` ${snake.list.getLength()}`;
        }


    }


}

initialize();
