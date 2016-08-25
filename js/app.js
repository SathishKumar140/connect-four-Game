import ConnectFour from './connectFour';

let game = new ConnectFour(window.innerWidth,window.innerHeight);
game.initializeScene('auto');
document.body.appendChild(game.renderer.view);
game.CreateHeader();
game.GameLayout('images/board.png');
game.setRenderBackground(0x061639);