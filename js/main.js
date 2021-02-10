import MainGame from './game.js';

$('document').ready(() => {
    const mainGame = new MainGame(document.getElementById('gameBody'));
    
    mainGame.startLoad();
});