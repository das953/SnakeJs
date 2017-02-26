/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by das953 on 15.02.17.
 */


__webpack_require__(0);
console.log("hello world");




/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by das953 on 23.02.17.
 */


module.exports =  function () {

    let DoublyLinkedList = __webpack_require__(3);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return (root.DoublyLinkedList = factory());
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.DoublyLinkedList = factory();
}
}(this, function () {

  var
    breaker = {};

  var
    floor = Math.floor,
    random = Math.random;

  function Node(data) {
    this.data = data;
    this.previous = null;
    this.next = null;
  }

  Node.prototype = {
    constructor: Node,

    hasPrevious: function () {
      return this.previous !== null;
    },

    hasNext: function () {
      return this.next !== null;
    }
  };

  function DoublyLinkedList() {
    this._head = null;
    this._tail = null;
    this._length = 0;
    this._isCircular = false;
  }

  DoublyLinkedList.VERSION = '0.1.6';

  DoublyLinkedList.forge = function () {
    /* jshint newcap: false */
    return new this();
  };

  DoublyLinkedList.forgeCircular = function () {
    return this.forge().makeCircular();
  };

  DoublyLinkedList.prototype = {
    constructor: DoublyLinkedList,

    makeCircular: function () {
      if ( ! this.isEmpty()) {
        this._head.previous = this._tail;
        this._tail.next = this._head;
      }

      this._isCircular = true;

      return this;
    },

    makeLinear: function () {
      if ( ! this.isEmpty()) {
        this._head.previous = null;
        this._tail.next = null;
      }

      this._isCircular = false;

      return this;
    },

    add: function (data) {
      var
        node = new Node(data),
        tail = this._tail;

      if ( ! this.isEmpty()) {
        tail.next = node;
        node.previous = tail;
        this._tail = node;
      } else {
        this._head = node;
        this._tail = node;
      }

      this._length += 1;

      if (this._isCircular) {
        this.makeCircular();
      }

      return this;
    },

    getAt: function (index) {
      var
        node = this._getAt(index);

      return (node !== null) ? node.data : null;
    },

    getFirst: function () {
      var
        node = this._head;

      return (node !== null) ? node.data : null;
    },

    getPrevious: function (data) {
      var
        node = this._getAdjacent(data, false);
      return (node !== null) ? node.data : null;
    },

    getNext: function (data) {
      var
        node = this._getAdjacent(data);

      return (node !== null) ? node.data : null;
    },

    getLast: function () {
      var
        node = this._tail;

      return (node !== null) ? node.data : null;
    },

    getRandom: function () {

      var
        min = 0,
        max = this.getLength(),
        rnd = floor(random() * (max - min)) + min;

      return this.getAt(rnd);
    },

    getIndexOf: function (data) {
      var
        index = 0,
        resultIndex = -1;

      this._traverse(function (node) {
        if (node.data === data) {
          resultIndex = index;
          return breaker;
        }
        index += 1;
      });

      return resultIndex;
    },

    getLastIndexOf: function (data) {
      var
        index = this._length - 1,
        resultIndex = -1;

      this._traverse(function (node) {
        if (node.data === data) {
          resultIndex = index;
          return breaker;
        }
        index -= 1;
      }, this._tail, false);

      return resultIndex;
    },

    filter: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData),
        res = false,
        result = DoublyLinkedList.forge();

      if (this._isCircular) { result.makeCircular(); }

      this._traverse(function (node){

        res = iterator.call(context, node.data);

        // console.log(res);
        if (res){
          result.add(node.data);
        }

      }, fromNode);

      return result;

    },

    some: function (iterator, fromData, context) {

      var
        fromNode = this._get(fromData),
        res = false;

      this._traverse(function (node){

        res = iterator.call(context, node.data);

        if (res){
          return breaker;
        }
      }, fromNode);

      return res;
    },

    every: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData),
        res = true;

      this._traverse(function (node){

        res = iterator.call(context, node.data);

        if ( ! res){
          return breaker;
        }
      }, fromNode);

      return res;
    },

    forEach: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData);

      this._traverse(function (node) {
        iterator.call(context, node.data);
      }, fromNode);
    },

    forEachReverse: function (iterator, fromData, context) {
      var
        fromNode = this._get(fromData);

      this._traverse(function (node) {
        iterator.call(context, node.data);
      }, fromNode, false);
    },

    removeAt: function (index) {
      var
        node = this._getAt(index),
        isHead = this._isHead(node),
        isTail = this._isTail(node);

      if (node !== null) {
        if (isHead) {
          this._head = node.next;
        }
        if (isTail) {
          this._tail = node.previous;
        }
        if (node.hasNext()) {
          node.next.previous = node.previous;
        }
        if (node.hasPrevious()) {
          node.previous.next = node.next;
        }
        this._length -= 1;

        if (isHead || isTail || this._isCircular) {
          this.makeCircular();
        }

        return node.data;
      }

      return null;
    },

    toArray: function () {
      var
        array = [],
        node = this._head;

      while (node !== null) {
        array.push(node.data);
        node = node.next;
      }

      return array;
    },

    toString: function () {
      return this.toArray().toString();
    },

    getLength: function () {
      return this._length;
    },

    isEmpty: function () {
      return this._length === 0;
    },

    isCircular: function () {
      return this._isCircular;
    },

    _get: function (data) {
      var
        resultNode = null;

      this._traverse(function (node) {
        if (node.data === data) {
          resultNode = node;
          return breaker;
        }
      });

      return resultNode;
    },

    _getAt: function (index) {
      var
        node,
        i;

      if (index > -1 && index < this._length) {
        node = this._head;
        i = 0;
        while (i < index) {
          node = node.next;
          i += 1;
        }
        return node;
      }

      return null;
    },

    _getAdjacent: function (data, useNext) {
      useNext = typeof useNext === 'boolean' ? useNext : true;
      var
        method = useNext ? 'next' : 'previous',
        resultNode = null;

      this._traverse(function (node) {
        if (node.data === data) {
          resultNode = node;
          return breaker;
        }
      });

      return (resultNode !== null) ? resultNode[method] : null;
    },

    _traverse: function (iterator, fromNode, useNext, context) {
      fromNode = fromNode || this._head;
      useNext = typeof useNext === 'boolean' ? useNext : true;

      var
        node = fromNode,
        length = this._length,
        i,
        method = useNext ? 'next' : 'previous';

      for (i = 0; i < length; i += 1) {
        if (node === null || iterator.call(context, node, this) === breaker) {
          return;
        }
        node = node[method];
      }
    },

    _isHead: function (node) {
      return node === this._head;
    },

    _isTail: function (node) {
      return node === this._tail;
    }
  };

  return DoublyLinkedList;
}));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by das953 on 15.02.17.
 */




function initialize() {

    __webpack_require__(1);


    let Snake = __webpack_require__(2);
    let snake = new Snake();
    let game = __webpack_require__(0);


    game.initSnake(snake.list);

    document.getElementsByTagName('BODY')[0].addEventListener('keydown', bodyKeyDown);
    document.getElementById('btnStart').addEventListener('click', startGame);
    document.getElementById('btnClear').addEventListener('click', clearField);


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
        }


    }


}

initialize();


/***/ })
/******/ ]);