import MainGame from './game.js';

$('document').ready(() => {
    const mainGame = new MainGame(
        document.getElementById('gameBody'),
        document.getElementById('gameControls')
    );
    
    mainGame.startLoad();
});