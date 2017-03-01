/**
 * Created by das953 on 15.02.17.
 */






module.exports =  {

    fieldSize : 11,
    cellSize : 50,




    /*
     * render snake
     * */
    render :  function snakeRender(list, foodPosition, sidePos) {

        let head, tail;




        if(foodPosition &&foodPosition[0] === sidePos[1] &&
            foodPosition[1] === sidePos[2]){

            let addCell = document.createElement('IMG');
            addCell.className = 'snakeCell';
            addCell.style.marginLeft = sidePos[1];
            addCell.style.marginTop = sidePos[2];

            list._tail.data.style.backgroundImage = `url('../resources/snakeSkin.jpg')`;

            list.add(addCell);



            document.getElementById('Field').appendChild(list._tail.data);

            let food = document.getElementById('food');
            document.getElementById('Field').removeChild(food);

            snakeHead();
            document.getElementById('Ssize').innerHTML = ` ${list.getLength()}`;
            return null;




        }
        else {

            head = list._head;
            tail = list._tail;


            head.data.style.marginLeft = sidePos[1];
            head.data.style.marginTop = sidePos[2];
            list._head = head.next;

            head.next = null;
            head.previous = tail;
            tail.next = head;

            tail.data.style.backgroundImage = `url('../resources/snakeSkin.jpg')`;
            list._tail = head;

            snakeHead();
            return foodPosition;


        }


        function snakeHead() {
            switch (sidePos[0]){

                case 1:

                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-left.jpg')`;
                    break;

                case 2:

                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-up.jpg')`;
                    break;

                case 3:

                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-right.jpg')`;
                    break;

                case 4:

                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-down.jpg')`;
                    break;


            }
        }




    },

    /*
     * return side movement
     * 1 - left
     * 2 - up
     * 3 - right
     * 4 - down
     * null
     *
     * */
    move:  function moveSnake(list,sidePos) {

        /*
         * signature
         * regular expression give number of pixels
         * by method exec( here is string )
         *
         *
         * only symbols before 'px'
         * return array
         * [0] = input string
         * [1] = first result
         *
         * */

        let regExp = /^(.*)px$/;






        switch (sidePos[0]){


            //left
            case 1:{

                let tailMarginLeft = Number(regExp.exec(list.getLast().style.marginLeft)[1]);


                if((tailMarginLeft - 50 >= 0) && function()  {

                    let flag = true;
                        list.forEach((data) =>{
                            if (data.style.marginLeft === ((tailMarginLeft -50) + 'px') &&
                                data.style.marginTop === list.getLast().style.marginTop)
                                flag = !flag;


                        }, list.getFirst());

                        return flag;

                    }()){

                    return [1, ((tailMarginLeft - 50) + 'px'), list.getLast().style.marginTop, 1];
                    //[side, new position]
                }
                else if(list._tail.previous.data.style.marginTop === list.getLast().style.marginTop &&
                    list._tail.previous.data.style.marginLeft === ((tailMarginLeft -50) + 'px')){


                    return moveSnake(list, [sidePos[3], list.getLast().style.marginLeft, list.getLast().style.marginTop, sidePos[3]]);

                }
                else
                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-left.jpg')`;
                    return null;

            }


            //up
            case 2:{

                let tailMarginTop = Number(regExp.exec(list.getLast().style.marginTop)[1]) || 0;


                //alert(tailMarginTop);

                if((tailMarginTop - 50 >= 0) && function () {

                        let flag = true;
                        list.forEach((data) =>{
                            if (data.style.marginTop === ((tailMarginTop - 50) + 'px') &&
                                data.style.marginLeft === list.getLast().style.marginLeft)
                                flag = !flag;

                        }, list.getFirst());
                        return flag;

                    }()){
                    //   alert(4 + ' ' + list.getLast().style.marginLeft + ' ' + ((tailMarginTop + 50) + 'px'));

                    return [2, list.getLast().style.marginLeft, ((tailMarginTop - 50) + 'px'), 2];
                    //[side, new position x, y]
                }
                else if(list._tail.previous.data.style.marginTop === ((tailMarginTop - 50) + 'px') &&
                    list._tail.previous.data.style.marginLeft === list.getLast().style.marginLeft){
                        //alert(sidePos[3]);

                    return moveSnake(list, [sidePos[3], list.getLast().style.marginLeft, list.getLast().style.marginTop, sidePos[3]]);

                }
                else
                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-up.jpg')`;
                    return null;

                // alert((tailMarginLeft + 50 < document.getElementById('Field').offsetWidth));





            }



            //right
            case 3:{

                let tailMarginLeft = Number(regExp.exec(list.getLast().style.marginLeft)[1]);


                if((tailMarginLeft + 50 < document.getElementById('Field').offsetWidth) && function () {

                        let flag = true;
                        list.forEach((data) =>{
                            if (data.style.marginLeft === ((tailMarginLeft +50) + 'px') &&
                                data.style.marginTop === list.getLast().style.marginTop)
                                flag = !flag;

                        }, list.getFirst());
                        return flag;

                    }()){

                    return [3, ((tailMarginLeft + 50) + 'px'), list.getLast().style.marginTop, 3];
                    //[side, new position x, y]
                }
                else if(list._tail.previous.data.style.marginTop === list.getLast().style.marginTop &&
                    list._tail.previous.data.style.marginLeft === ((tailMarginLeft + 50) + 'px')){


                    return moveSnake(list, [sidePos[3], list.getLast().style.marginLeft, list.getLast().style.marginTop, sidePos[3]]);

                }
                else
                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-right.jpg')`;
                    return null;




            }

            //down
            case 4:{

                let tailMarginTop = Number(regExp.exec(list.getLast().style.marginTop)[1]) || 0;


                //alert(offsetHeight);

                if((tailMarginTop + 50 < document.getElementById('Field').offsetHeight) && function () {

                        let flag = true;
                        list.forEach((data) =>{
                            if (data.style.marginTop === ((tailMarginTop +50) + 'px') &&
                                data.style.marginLeft === list.getLast().style.marginLeft)
                                flag = !flag;

                        }, list.getFirst());
                        return flag;

                    }()){
                 //   alert(4 + ' ' + list.getLast().style.marginLeft + ' ' + ((tailMarginTop + 50) + 'px'));

                    return [4, list.getLast().style.marginLeft, ((tailMarginTop + 50) + 'px'), 4];
                    //[side, new position x, y]
                }
                else if(list._tail.previous.data.style.marginTop === ((tailMarginTop + 50) + 'px') &&
                    list._tail.previous.data.style.marginLeft === list.getLast().style.marginLeft){
                    //alert(sidePos[3]);

                    return moveSnake(list, [sidePos[3], list.getLast().style.marginLeft, list.getLast().style.marginTop, sidePos[3]]);

                }
                else
                    list._tail.data.style.backgroundImage = `url('../resources/snakeHead-down.jpg')`;
                    return null;
            }

        }


    },

    /*
    * init snake`s first cells
    * */
    initSnake :  function initializeSnake(list) {

        var KusokZmiiN1 = document.createElement('IMG');
        KusokZmiiN1.className = 'snakeCell';
        KusokZmiiN1.style.marginTop = '0px';


        var KusokZmiiN2 = document.createElement('IMG');
        KusokZmiiN2.className = 'snakeCell';
        KusokZmiiN2.style.marginLeft = '50px';
        KusokZmiiN2.style.marginTop = '0px';


        var GolovaZmii = document.createElement('IMG');
        GolovaZmii.className = 'snakeCell';
        GolovaZmii.style.marginLeft = '100px';
        GolovaZmii.style.backgroundImage = `url('../resources/snakeHead-right.jpg')`;
        GolovaZmii.style.marginTop = '0px';

        list.add(KusokZmiiN1); //head

        list.add(KusokZmiiN2);

        list.add(GolovaZmii); //tail


        list.forEach(function (data) {
            document.getElementById('Field').appendChild(data);
        }, list.getFirst());



    },

    /*
     * just check it`s victory or ZRADA))
     * */
    result : function gameResult(list) {



        if(list.getLength() === (this.fieldSize * this.fieldSize)){
            alert('V I C T O R Y !!!!!!!!');
        }
        else {
            alert("GAME OVER");
            alert("looser");
        }

},

    /*
     * food placement on game field by random
     * @return new coordinates and draw food
     * or null
     * */
    foodPos : function foodPlacement(list, fieldSize, cellSize) {


        /*
        * [0] - marginLeft (x)
        * [1] - marginTop (y)
        * */
        var foodCoord = [];


       //alert(fieldSize*fieldSize + ' l ' + list.getLength());

        /*
        * if snake < all field
        * */
        if(fieldSize*fieldSize > list.getLength()){


            /*
            * do
            *
            * generate random food position
            *
            * while
            * food`s coord x == snake`s cell x coord
            * and
            * food`s coord y == snake`s cell y coord
            * */
            do{



                foodCoord.push(( Math.round(Math.random() * (fieldSize - 1) ) * cellSize) + 'px');
                foodCoord.push(( Math.round(Math.random() * (fieldSize - 1) ) * cellSize) + 'px');




            }while (!function () {


                let flag = true;
                list.forEach((data) =>{


                   if (data.style.marginLeft === (foodCoord[0]) &&
                       data.style.marginTop === (foodCoord[1])){

                       foodCoord = [];
                      flag = !flag;
                      return;
                    }


                }, list.getFirst());

                return flag;

            }());


            let oldFood = document.getElementById('food');


            if(oldFood)
                document.getElementById('Field').removeChild(oldFood);

            var apple = document.createElement('IMG');
            apple.id = 'food';
            apple.style.marginLeft = foodCoord[0];
            apple.style.marginTop = foodCoord[1];
            apple.className = 'snakeCell';
            apple.style.backgroundImage = `url('../resources/apple-sm.png')`;

            document.getElementById('Field').appendChild(apple);

            return foodCoord;

        }
        else {
            return null;
        }




}












}
