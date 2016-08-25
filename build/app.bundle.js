/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _connectFour = __webpack_require__(1);
	
	var _connectFour2 = _interopRequireDefault(_connectFour);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = new _connectFour2.default(window.innerWidth, window.innerHeight);
	game.initializeScene('auto');
	document.body.appendChild(game.renderer.view);
	game.CreateHeader();
	game.GameLayout('images/board.png');
	game.setRenderBackground(0x061639);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _gluckGames = __webpack_require__(2);
	
	var _gluckGames2 = _interopRequireDefault(_gluckGames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var loader = PIXI.loader,
	    resources = PIXI.loader.resources,
	    sprite = PIXI.Sprite,
	    Graphics = PIXI.Graphics,
	    Text = PIXI.Text,
	    container = PIXI.Container;
	
	var ConnectFour = function (_GluckGames) {
		_inherits(ConnectFour, _GluckGames);
	
		function ConnectFour(width, height) {
			_classCallCheck(this, ConnectFour);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectFour).call(this, width, height));
	
			_this.player = true;
			_this.rows = 6, _this.column = 7;
			_this.boardArray();
			_this.resultShown = false;
			return _this;
		}
	
		/* @method CreateHeader
	    *  Creating header with player info and game title.
	    */
	
	
		_createClass(ConnectFour, [{
			key: "CreateHeader",
			value: function CreateHeader() {
				var xOffset = this.width / 4,
				    yOffset = 120,
	
	
				//Game title
				GameTitle = new Text("CONNECT 4", { font: "44px Futura", fill: 0x542733 }),
				    playerInfoHolder = this.drawRectangle({ width: 642, height: 60, fillColor: 0xdf4167, lineWidth: 2, lineColor: 0x000000, line: true });
	
				//Player 1 Text
				this.player1 = new Text("Player 1", { font: "30px Futura", fill: 'white' }),
				//Player 2 Text
				this.player2 = new Text("Player 2", { font: "30px Futura", fill: 'black' }), this.playerInfoScene = new container();
				this.playerInfoScene.position.set(xOffset, yOffset / 2);
				this.stage.addChild(this.playerInfoScene);
	
				GameTitle.position.set(this.playerInfoScene.x / 1.6, this.playerInfoScene.y / 8);
	
				this.player1.position.set(40, 12);
				this.player2.position.set(510, 12);
	
				var playerRect = this.drawRectangle({ width: 150, height: 40, fillColor: 0xffc208, lineWidth: 2, lineColor: 0xffe6e6, line: true, rounded: true, radius: 10 });
				var player2Rect = this.drawRectangle({ width: 150, height: 40, fillColor: 0x2F4F4F, lineWidth: 2, lineColor: 0xffe6e6, line: true, rounded: true, radius: 10 });
	
				playerRect.position.set(10, 10);
				player2Rect.position.set(480, 10);
	
				this.playerInfoScene.addChild(playerInfoHolder);
				this.playerInfoScene.addChild(player2Rect);
				this.playerInfoScene.addChild(this.player2);
				this.playerInfoScene.addChild(playerRect);
				this.playerInfoScene.addChild(this.player1);
				this.playerInfoScene.addChild(GameTitle);
			}
	
			/* @method GameLayout
	     *  @param image
	     *  This method is used to draw game layout with image.
	     */
	
		}, {
			key: "GameLayout",
			value: function GameLayout(image) {
				var _this2 = this;
	
				this.scene = new container();
				this.stage.addChild(this.scene);
	
				//Creating game result scene and by default making it unavailable.
				this.GameResultScene = new container();
				this.stage.addChild(this.GameResultScene);
				this.GameResultScene.visible = false;
	
				var xOffset = this.width / 4,
				    yOffset = 120,
				    rectangle = new Graphics(),
				    boardRectangle = this.drawRectangle({ width: 640, height: 480, fillColor: 0xe6f2ff, lineWidth: 4, lineColor: 0x000000, line: true });
				//This is used to display game playing area
				this.GamePlayArea = new container();
				this.GamePlayArea.position.set(xOffset, yOffset);
				this.GameResultScene.position.set(xOffset, yOffset);
				this.scene.addChild(this.GamePlayArea);
				this.GamePlayArea.addChild(boardRectangle);
	
				//Loading an image for background
				loader.add(image).load(function () {
					var board = new sprite(resources[image].texture);
					board.width = 640;
					board.height = 480;
					board.interactive = true;
	
					// Set interactions on our goose 
					board.on('mousedown', _this2.onButtonDown.bind(_this2)).on('touchstart', _this2.onButtonDown.bind(_this2));
					_this2.GamePlayArea.addChild(board);
				});
			}
	
			/* @method onButtonDown
	     *  @param event
	     *  Mouse down event for game board and to play again button
	     */
	
		}, {
			key: "onButtonDown",
			value: function onButtonDown(event) {
				if (!this.resultShown) {
					var bubble = this.insertObject(event.data.global.x - 640 / 2);
					this.bubble = bubble;
					this.GamePlayArea.addChild(bubble);
				} else {
					this.resetScene();
				}
			}
	
			/* @method insertObject
	     *  @param x
	     *  By passing an client x position to place a circle object in exact x position of the gameboard and its returning object with circle.
	     */
	
		}, {
			key: "insertObject",
			value: function insertObject(x) {
				var bubble = void 0;
				if (this.player) {
					bubble = this.drawCircle('0xffc208', 37);
					this.player = false;
					this.player1.setStyle({ font: "30px Futura", fill: 'black' });
					this.player2.setStyle({ font: "30px Futura", fill: 'white' });
				} else {
					bubble = this.drawCircle('0x2F4F4F', 37);
					this.player = true;
					this.player1.setStyle({ font: "30px Futura", fill: 'white' });
					this.player2.setStyle({ font: "30px Futura", fill: 'black' });
				}
				bubble.name = 'spriteObjects';
				var bubbleX = x,
				    split = 640 / 7,
				    bubbleY = bubble.height / 2;
				if (split * 7 > bubbleX && split * 6 < bubbleX) {
					bubble.position.set(split * 7 - split / 2 - 4, bubbleY);
					bubble.column = 7;
				} else if (split * 6 > bubbleX && split * 5 < bubbleX) {
					bubble.position.set(split * 6 - split / 2 - 3, bubbleY);
					bubble.column = 6;
				} else if (split * 5 > bubbleX && split * 4 < bubbleX) {
					bubble.position.set(split * 5 - split / 2 - 2, bubbleY);
					bubble.column = 5;
				} else if (split * 4 > bubbleX && split * 3 < bubbleX) {
					bubble.position.set(split * 4 - split / 2, bubbleY);
					bubble.column = 4;
				} else if (split * 3 > bubbleX && split * 2 < bubbleX) {
					bubble.position.set(split * 3 - split / 2 + 2, bubbleY);
					bubble.column = 3;
				} else if (split * 2 > bubbleX && split < bubbleX) {
					bubble.position.set(split * 2 - split / 2 + 3, bubbleY);
					bubble.column = 2;
				} else if (split > bubbleX && 0 < bubbleX) {
					bubble.position.set(split - split / 2 + 4, bubbleY);
					bubble.column = 1;
				}
				return bubble;
			}
	
			/* @method insertObject
	     *  This method is used to reset default values.
	     */
	
		}, {
			key: "resetScene",
			value: function resetScene() {
				this.GamePlayArea.visible = true;
				this.resultShown = false;
				this.GameResultScene.visible = false;
				for (var i = this.GamePlayArea.children.length - 1; i >= 0; i--) {
					if (this.GamePlayArea.children[i].name === 'spriteObjects') {
						this.GamePlayArea.removeChild(this.GamePlayArea.children[i]);
					}
				};
				this.boardArray();
				this.player1.setStyle({ font: "30px Futura", fill: 'white' });
			}
			/* @method play
	     *  This is an parent class method and its used to animate bubble from top position and checking for result.
	     */
	
		}, {
			key: "play",
			value: function play() {
				if (this.bubble !== undefined) {
					var row = this.getRowVacancy(this.bubble.column - 1) + 1;
					var y = 480 / 6 * row - this.bubble.height / 2;
					if (y >= this.bubble.y + 40) {
						this.bubble.position.set(this.bubble.x, this.bubble.y + 50);
					} else {
						if (this.player) {
							this.board[row - 1][this.bubble.column - 1] = 1;
							this.pass = 2;
						} else {
							this.board[row - 1][this.bubble.column - 1] = 2;
							this.pass = 1;
						}
						this.bubble.position.set(this.bubble.x, y);
						var result = this.checkForWinner(row - 1, this.bubble.column - 1);
						if (result) {
							this.GamePlayArea.visible = false;
							this.resultShown = true;
							this.GameResultScene.visible = true;
							this.bubble = undefined;
							this.PlayerWon = new Text("PLAYER " + this.pass + " WON", { font: "24px Futura", fill: 0x542733 });
							var congrats = this.drawRectangle({ width: 300, height: 50, fillColor: 0x00BFFF, lineWidth: 2, lineColor: 0xffe6e6, line: true, rounded: true, radius: 10 });
							congrats.position.set(640 / 4, 480 / 3 - 10);
							this.PlayerWon.position.set(640 / 4 + 60, 480 / 3);
							var playAgain = this.drawRectangle({ width: 230, height: 60, fillColor: 0xFF5733, lineWidth: 2, lineColor: 0xffe6e6, line: true, rounded: true, radius: 5 });
							playAgain.position.set(640 / 3.2, 480 / 2 - 5);
							var playAgainText = new Text("Play Again", { font: "34px Futura", fill: 0x542733 });
							playAgain.interactive = true;
							playAgain.on('mousedown', this.onButtonDown.bind(this));
							playAgainText.position.set(640 / 3.3 + 50, 480 / 2);
							this.GameResultScene.addChild(this.drawRectangle({ width: 640, height: 480, fillColor: 0x000000, lineWidth: 4, lineColor: 0x000000, line: true }));
							this.GameResultScene.addChild(congrats);
							this.GameResultScene.addChild(this.PlayerWon);
							this.GameResultScene.addChild(playAgain);
							this.GameResultScene.addChild(playAgainText);
							this.player1.setStyle({ font: "30px Futura", fill: 'black' });
							this.player2.setStyle({ font: "30px Futura", fill: 'black' });
						}
						this.bubble = undefined;
					}
				}
			}
	
			/* @method boardArray
	     * This will create an two dimensional array with 6x7.
	     */
	
		}, {
			key: "boardArray",
			value: function boardArray() {
				this.board = new Array(this.rows);
				for (var i = 0; i < this.rows; i++) {
					this.board[i] = [];
					for (var j = 0; j < this.column; j++) {
						this.board[i][j] = 0;
					}
				}
			}
			/* @method getRowVacancy
	     * This will check which row is available in particular column.
	     */
	
		}, {
			key: "getRowVacancy",
			value: function getRowVacancy(column) {
				var row = void 0;
				for (var i = 0; i < this.rows; i++) {
					if (this.board[i][column] === 0) {
						row = i;
					}
				}
				return row;
			}
	
			/* @method checkForWinner
	  * @param row
	  * @param column
	     * By passing an row and column it will check for winner if its true otherwise it will return false.
	     */
	
		}, {
			key: "checkForWinner",
			value: function checkForWinner(row, column) {
				if (this.verticalCheck(row, column)) return true;
				if (this.horizontalCheck(row, column)) return true;
				if (this.leftUpDiagonalCheck(row, column)) return true;
				if (this.rightUpDiagonalCheck(row, column)) return true;
				return false;
			}
	
			/* @method verticalCheck
	  * @param row
	  * @param column
	     * Vertical check for winner
	     */
	
		}, {
			key: "verticalCheck",
			value: function verticalCheck(row, column) {
				if (row >= this.rows - 3) {
					return false;
				}
				for (var i = row + 1; i <= row + 3; i++) {
					if (this.board[i][column] != this.board[row][column]) {
						return false;
					}
				}
				return true;
			}
	
			/* @method horizontalCheck
	  * @param row
	  * @param column
	     * Horizontal check for winner
	     */
	
		}, {
			key: "horizontalCheck",
			value: function horizontalCheck(row, column) {
				var counter = 1;
				for (var i = column - 1; i >= 0; i--) {
					if (this.board[row][i] != this.board[row][column]) {
						break;
					}
					counter++;
				}
	
				for (var j = column + 1; j < this.column; j++) {
					if (this.board[row][j] != this.board[row][column]) {
						break;
					}
					counter++;
				}
	
				if (counter >= 4) {
					return true;
				} else {
					return false;
				}
			}
			/* @method leftUpDiagonalCheck
	  * @param row
	  * @param column
	     */
	
		}, {
			key: "leftUpDiagonalCheck",
			value: function leftUpDiagonalCheck(row, column) {
				var counter = 1;
	
				row = row - 1;
				column = column - 1;
	
				var _row = row,
				    _column = column;
				while (row >= 0 && column >= 0) {
					if (this.board[row][column] == this.board[row + 1][column + 1]) {
						counter++;
						row--;
						column--;
					} else {
						break;
					}
				}
	
				row = _row + 2;
				column = _column + 2;
	
				while (row < this.rows && column < this.column) {
					if (this.board[row][column] == this.board[_row + 1][_column + 1]) {
						counter++;
						row++;
						column++;
					} else {
						break;
					}
				}
				if (counter >= 4) {
					return true;
				} else {
					return false;
				}
			}
	
			/* @method rightUpDiagonalCheck
	  * @param row
	  * @param column
	     */
	
		}, {
			key: "rightUpDiagonalCheck",
			value: function rightUpDiagonalCheck(row, column) {
				var counter = 1;
	
				row = row + 1;
				column = column - 1;
	
				var _row = row,
				    _column = column;
				while (row < this.rows && column >= 0) {
					if (this.board[row][column] == this.board[_row - 1][_column + 1]) {
						counter++;
						row++;
						column--;
					} else {
						break;
					}
				}
	
				row = _row - 2;
				column = _column + 2;
	
				while (row >= 0 && column < this.column) {
					if (this.board[row][column] == this.board[_row - 1][_column + 1]) {
						counter++;
						row--;
						column++;
					} else {
						break;
					}
				}
				if (counter >= 4) {
					return true;
				} else {
					return false;
				}
			}
		}]);
	
		return ConnectFour;
	}(_gluckGames2.default);
	
	exports.default = ConnectFour;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var container = PIXI.Container,
	    Graphics = PIXI.Graphics;
	
	var GluckGames = function () {
	    function GluckGames(width, height) {
	        _classCallCheck(this, GluckGames);
	
	        this.width = width;
	        this.height = height;
	    }
	
	    /*To initialize a scene
	    * @param renderMode - used to set which mode PIXI has to render.
	    */
	
	
	    _createClass(GluckGames, [{
	        key: 'initializeScene',
	        value: function initializeScene(renderMode) {
	            this.setRenderMode(renderMode);
	            this.stage = new container();
	            this.renderer = this.renderScene(this.width, this.height);
	            this.animate();
	        }
	
	        /* @method animate
	        *  It is used to animate scene in render.
	        */
	
	    }, {
	        key: 'animate',
	        value: function animate() {
	            var _this = this;
	
	            window.requestAnimationFrame(function () {
	                return _this.animate();
	            });
	            this.play();
	            this.renderer.render(this.stage);
	        }
	
	        /* @method setRenderMode
	        *  @param value
	        *  Render mode change on runtime using this function or by default.
	        */
	
	    }, {
	        key: 'setRenderMode',
	        value: function setRenderMode(value) {
	            if (value === 'auto') {
	                this.renderScene = PIXI.autoDetectRenderer;
	            } else if (value === 'WebGL') {
	                this.renderScene = PIXI.WebGLRenderer;
	            } else if (value === 'canvas') {
	                this.renderScene = PIXI.CanvasRenderer;
	            }
	        }
	        /* @method play.
	        *  This is can be used by child class for animating their method.
	        */
	
	    }, {
	        key: 'play',
	        value: function play() {}
	
	        /* @method setRenderBackground 
	        *  @param color
	        *  We change render  color of the background by using this method.
	        */
	
	    }, {
	        key: 'setRenderBackground',
	        value: function setRenderBackground(color) {
	            this.renderer.backgroundColor = color;
	        }
	
	        /* @method resizeScene 
	        *  @param width
	        *  @param height
	        *  This is used to resize the screen on runtime.
	        */
	
	    }, {
	        key: 'resizeScene',
	        value: function resizeScene(width, height) {
	            this.renderer.autoResize = true;
	            this.renderer.resize(width, height);
	        }
	
	        /* @method drawCircle 
	        *  @param color - used to set color of the circle.
	        *  @param radius - circle radius
	        *  This is used to draw circle and return circle object.
	        */
	
	    }, {
	        key: 'drawCircle',
	        value: function drawCircle(color, radius) {
	            var circle = new Graphics();
	            circle.beginFill(color);
	            circle.drawCircle(0, 0, radius);
	            circle.endFill();
	            return circle;
	        }
	
	        /* @method drawRectangle 
	        *  @param properties - object has many properties like line width,color,fill color etc.
	        *  @param radius - circle radius
	        *  This is used to draw rectangle or rounded rectangle based on properties object it will draw and return rectangle object.
	        */
	
	    }, {
	        key: 'drawRectangle',
	        value: function drawRectangle(properties) {
	            var rectangle = new Graphics();
	            if (properties.line) {
	                rectangle.lineStyle(properties.lineWidth, properties.lineColor, 1);
	            }
	            rectangle.beginFill(properties.fillColor);
	            if (properties.rounded) {
	                rectangle.drawRoundedRect(0, 0, properties.width, properties.height, properties.radius);
	            } else {
	                rectangle.drawRect(0, 0, properties.width, properties.height);
	            }
	            rectangle.endFill();
	            return rectangle;
	        }
	    }]);
	
	    return GluckGames;
	}();
	
	exports.default = GluckGames;

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map