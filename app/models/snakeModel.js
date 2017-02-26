/**
 * Created by das953 on 23.02.17.
 */
"use strict";

module.exports =  function () {

    let DoublyLinkedList = require('doubly-linked-list-js');

    /*
    * [0] - new movement side
    * [1] - marginLeft
    * [2] - marginTop
    * [3] - old movement side
    * */
    this.sidePos = [3, '0px', '0px', 3];
    this.foodPosition= [];
    this.list =  new DoublyLinkedList();

    /*
    * it`s a flag ))
    * 0 - not started yet
    * 1 - already started
    * 2 - game over
    * */
    this.onGame = 0;


    this.moveInterval =   function (game, interval) {


        let inter = setInterval(() => {


            if (this.onGame === 1) {
                this.sidePos = game.move(this.list, this.sidePos);


                this.sidePos ?
                    this.foodPosition = game.render(this.list, this.foodPosition, this.sidePos) :
                    (() => {
                        clearInterval(inter);
                        game.result(this.list);
                        this.onGame = 2;

                    })();


                if(this.list.getLength() === 10){
                    clearInterval(inter);
                   inter = this.moveInterval(game, 400);
                }
                else if(this.list.getLength() === 20){
                    clearInterval(inter);
                    inter = this.moveInterval(game, 300);
                }
                else if(this.list.getLength() === 30){
                    clearInterval(inter);
                    inter = this.moveInterval(game, 250);
                }
                else if(this.list.getLength() === 40){
                    clearInterval(inter);
                    inter = this.moveInterval(game, 150);
                }


            }
            else {
                clearInterval(inter);
            }




        }, interval);

        return inter;
    };


    this.foodInterval = function (game, interval) {

        let inter = setInterval(() => {

                if(this.onGame === 1) {
                    this.foodPosition = game.foodPos(this.list, game.fieldSize, game.cellSize);
                }
                else{
                    clearInterval(inter);
                    this.foodPosition = null;
                }


            }
            , interval);

        return inter;
    };



};