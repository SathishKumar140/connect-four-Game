import GluckGames from './gluckGames';

let loader = PIXI.loader,
    resources = PIXI.loader.resources,
    sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text,
    container = PIXI.Container;

export default class ConnectFour extends GluckGames{
	constructor(width,height) {
	    super(width, height);
	    this.player = true;
	    this.rows = 6,
	    this.column = 7;
	    this.boardArray();
	    this.resultShown = false;
	}

	/* @method CreateHeader
    *  Creating header with player info and game title.
    */
	CreateHeader(){
		let xOffset = this.width/4,
			yOffset = 120,

			//Game title
			GameTitle = new Text(
				    "CONNECT 4", 
				    {font: "44px Futura", fill: 0x542733}
			),
			playerInfoHolder = this.drawRectangle({width:642,height:60,fillColor:0xdf4167,lineWidth:2,lineColor:0x000000,line:true});

		//Player 1 Text
		this.player1 = new Text(
			    "Player 1", 
			    {font: "30px Futura", fill: 'white'}
			),
	    //Player 2 Text
		this.player2 = new Text(
			    "Player 2", 
			    {font: "30px Futura", fill: 'black'}
			),
		this.playerInfoScene = new container();
		this.playerInfoScene.position.set(xOffset,yOffset/2);
		this.stage.addChild(this.playerInfoScene);

		GameTitle.position.set(this.playerInfoScene.x/1.6,this.playerInfoScene.y/8);

		this.player1.position.set(40,12);
		this.player2.position.set(510,12);

		let playerRect = this.drawRectangle({width:150,height:40,fillColor:0xffc208,lineWidth:2,lineColor:0xffe6e6,line:true,rounded:true,radius:10});
		let player2Rect = this.drawRectangle({width:150,height:40,fillColor:0x2F4F4F,lineWidth:2,lineColor:0xffe6e6,line:true,rounded:true,radius:10});
		
		playerRect.position.set(10,10);
		player2Rect.position.set(480,10);

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
	GameLayout(image){
		this.scene = new container();
		this.stage.addChild(this.scene);

		//Creating game result scene and by default making it unavailable.
		this.GameResultScene = new container();
		this.stage.addChild(this.GameResultScene);
		this.GameResultScene.visible = false;

		let xOffset = this.width/4,
			yOffset = 120,
		 	rectangle = new Graphics(),
			boardRectangle = this.drawRectangle({width:640,height:480,fillColor:0xe6f2ff,lineWidth:4,lineColor:0x000000,line:true});
		//This is used to display game playing area
		this.GamePlayArea = new container();
		this.GamePlayArea.position.set(xOffset,yOffset);
		this.GameResultScene.position.set(xOffset,yOffset);
		this.scene.addChild(this.GamePlayArea);
		this.GamePlayArea.addChild(boardRectangle);

		//Loading an image for background
		loader
		  .add(image)
		  .load(()=>{
		  	let board = new sprite(resources[image].texture);
		  	board.width = 640;
		  	board.height = 480;
		  	board.interactive = true;
  
			// Set interactions on our goose 
			board
			    .on('mousedown', this.onButtonDown.bind(this))
			    .on('touchstart', this.onButtonDown.bind(this));
		  	this.GamePlayArea.addChild(board);
		});
	}

	/* @method onButtonDown
    *  @param event
    *  Mouse down event for game board and to play again button
    */
	onButtonDown(event){
		if(!this.resultShown){
			let bubble = this.insertObject(event.data.global.x-640/2)
			this.bubble = bubble;
			this.GamePlayArea.addChild(bubble);
		}else{
			this.resetScene();
		}
	}

	/* @method insertObject
    *  @param x
    *  By passing an client x position to place a circle object in exact x position of the gameboard and its returning object with circle.
    */
	insertObject(x){
		let bubble;
		if(this.player){
			bubble = this.drawCircle('0xffc208',37);
			this.player = false;
			this.player1.setStyle({font: "30px Futura",fill:'black'});
			this.player2.setStyle({font: "30px Futura",fill:'white'});
		}else{
			bubble = this.drawCircle('0x2F4F4F',37);
			this.player = true;
			this.player1.setStyle({font: "30px Futura",fill:'white'});
			this.player2.setStyle({font: "30px Futura",fill:'black'});
		}
		bubble.name = 'spriteObjects'
		let bubbleX = x,
			split = 640/7,
			bubbleY = bubble.height/2;
		if(split*7 > bubbleX && split*6 < bubbleX){
			bubble.position.set(split*7-split/2-4,bubbleY);
			bubble.column = 7;
		}else if(split*6 > bubbleX && split*5 < bubbleX){
			bubble.position.set(split*6-split/2-3,bubbleY);
			bubble.column = 6;
		}else if(split*5 > bubbleX && split*4 < bubbleX){
			bubble.position.set(split*5-split/2-2,bubbleY);
			bubble.column = 5;
		}else if(split*4 > bubbleX && split*3 < bubbleX){
			bubble.position.set(split*4-split/2,bubbleY);
			bubble.column = 4;
		}else if(split*3 > bubbleX && split*2 < bubbleX){
			bubble.position.set(split*3-split/2+2,bubbleY);
			bubble.column = 3;
		}else if(split*2 > bubbleX && split < bubbleX){
			bubble.position.set(split*2-split/2+3,bubbleY);
			bubble.column = 2;
		}else if(split > bubbleX && 0 < bubbleX){
			bubble.position.set(split-split/2+4,bubbleY);
			bubble.column = 1;
		}
		return bubble;
	}

	/* @method insertObject
    *  This method is used to reset default values.
    */
	resetScene(){
		this.GamePlayArea.visible = true;
		this.resultShown = false;
		this.GameResultScene.visible = false;
		for (let i = this.GamePlayArea.children.length - 1; i >= 0; i--) {	
			if(this.GamePlayArea.children[i].name === 'spriteObjects'){
				this.GamePlayArea.removeChild(this.GamePlayArea.children[i]);
			}
		};
		this.boardArray();
		this.player1.setStyle({font: "30px Futura",fill:'white'});
	}
	/* @method play
    *  This is an parent class method and its used to animate bubble from top position and checking for result.
    */
	play(){
		if(this.bubble!==undefined){
			let row = this.getRowVacancy(this.bubble.column-1)+1;
			let y = (480/6)*row-(this.bubble.height/2);
			if(y >= this.bubble.y+40){
				this.bubble.position.set(this.bubble.x,this.bubble.y+50);
			}else{
				if(this.player){
					this.board[row-1][this.bubble.column-1] = 1;
					this.pass = 2;
				}else{
					this.board[row-1][this.bubble.column-1] = 2;
					this.pass = 1;
				}
				this.bubble.position.set(this.bubble.x,y);
				let result = this.checkForWinner(row-1,this.bubble.column-1);
				if(result){
					this.GamePlayArea.visible = false;
					this.resultShown = true;
					this.GameResultScene.visible = true;
					this.bubble = undefined;
					this.PlayerWon = new Text(
					    `PLAYER ${this.pass} WON`, 
					    {font: "24px Futura", fill: 0x542733}
					)
					let congrats = this.drawRectangle({width:300,height:50,fillColor:0x00BFFF,lineWidth:2,lineColor:0xffe6e6,line:true,rounded:true,radius:10});
					congrats.position.set(640/4,480/3-10);
					this.PlayerWon.position.set(640/4+60,480/3)
					let playAgain = this.drawRectangle({width:230,height:60,fillColor:0xFF5733,lineWidth:2,lineColor:0xffe6e6,line:true,rounded:true,radius:5});
					playAgain.position.set(640/3.2,480/2-5);
					let playAgainText = new Text(
					    `Play Again`, 
					    {font: "34px Futura", fill: 0x542733}
					);
					playAgain.interactive = true;
					playAgain.on('mousedown', this.onButtonDown.bind(this));
					playAgainText.position.set(640/3.3+50,480/2);
					this.GameResultScene.addChild(this.drawRectangle({width:640,height:480,fillColor:0x000000,lineWidth:4,lineColor:0x000000,line:true}));
					this.GameResultScene.addChild(congrats);
					this.GameResultScene.addChild(this.PlayerWon);
					this.GameResultScene.addChild(playAgain);
					this.GameResultScene.addChild(playAgainText);
					this.player1.setStyle({font: "30px Futura",fill:'black'});
					this.player2.setStyle({font: "30px Futura",fill:'black'});
				}
				this.bubble = undefined;
			}
		}
	}

	/* @method boardArray
    * This will create an two dimensional array with 6x7.
    */
	boardArray(){
		this.board = new Array(this.rows);
		for(let i = 0; i < this.rows; i++)
	    {
	        this.board[i] = [];
	        for(let j = 0; j < this.column; j++)
	        {
	            this.board[i][j] = 0;
	        }
	    }
	}
	/* @method getRowVacancy
    * This will check which row is available in particular column.
    */
	getRowVacancy(column){
		let row;
		for(let i = 0; i < this.rows; i++){
			if(this.board[i][column]===0){
				row = i;
			}
		}
		return row
	}


	/* @method checkForWinner
	* @param row
	* @param column
    * By passing an row and column it will check for winner if its true otherwise it will return false.
    */
	checkForWinner(row,column){
		if(this.verticalCheck(row,column))
			return true;
	    if(this.horizontalCheck(row,column))
	    	return true;
	    if(this.leftUpDiagonalCheck(row,column))
	    	return true;
	    if(this.rightUpDiagonalCheck(row,column))
	    	return true;
	    return false;
	}

	/* @method verticalCheck
	* @param row
	* @param column
    * Vertical check for winner
    */
	verticalCheck(row,column){
		if (row >= this.rows - 3)
	    {
	        return false;
	    }
	    for (let i = row+1; i <= row + 3; i++)
	    {
	        if (this.board[i][column] != this.board[row][column])
	        {
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
	horizontalCheck(row,column){
		let counter = 1;
		for(let i = column-1; i>=0; i--)
	    {
	        if(this.board[row][i] != this.board[row][column])
	        {
	            break;
	        }
	        counter++;
	    }
	             
	    for(let j = column+1; j<this.column; j++)
	    {
	        if(this.board[row][j] != this.board[row][column])
	        {
	            break;
	        }
	        counter++;
	    }
	             
	    if(counter >=4)
	    {
	        return true;
	    }
	    else
	    {
	        return false;
	    }
	}
	/* @method leftUpDiagonalCheck
	* @param row
	* @param column
    */
	leftUpDiagonalCheck(row,column){
		let counter = 1;

	    row = row - 1;
	    column = column - 1;
	    
 		let _row = row,_column = column;
	    while (row >= 0 && column >= 0)
	    {
	        if (this.board[row][column] == this.board[row+1][column+1])
	        {
	            counter++;
	            row--;
	            column--;
	        } 
	        else
	        {
	            break;            
	        }
	    }
	         
	    row = _row + 2;
	    column = _column + 2;
	         
	    while (row < this.rows && column < this.column)
	    {            
	        if (this.board[row][column] == this.board[_row+1][_column+1])
	        {
	            counter++;
	            row++;
	            column++;
	        } 
	        else
	        {
	             break;
	        }
	    }
	    if(counter >=4)
	    {
	        return true;
	    }
	    else
	    {
	        return false;
	    }
	}

	/* @method rightUpDiagonalCheck
	* @param row
	* @param column
    */
	rightUpDiagonalCheck(row,column){
		let counter = 1;

		row = row + 1;
	    column = column - 1;

        let _row = row,_column = column;
	    while (row < this.rows && column >= 0)
	    {
	        if (this.board[row][column] == this.board[_row-1][_column+1])
	        {
	            counter++;
	            row++;
	            column--;
	        } 
	        else
	        {
	            break;            
	        }
	    }
	         
	    row = _row - 2;
	    column = _column + 2;
	 
	    while (row >= 0 && column < this.column)
	    {            
	        if (this.board[row][column] == this.board[_row-1][_column+1])
	        {
	            counter++;
	            row--;
	            column++;
	        } 
	        else
	        {
	             break;
	        }
	    }
	    if(counter >=4)
	    {
	        return true;
	    }
	    else
	    {
	        return false;
	    }
	}
}