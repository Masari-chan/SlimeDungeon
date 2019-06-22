

//let game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");

var game;

var wfConfig = {
    active: function () {//setTimeout(startGame,10000);
        startGame();
    },

    google: {
        families: ['Rammetto One', 'Sniglet']
    },
    
    custom: {
        families: ['FerrumExtracondensed'],
        urls: ["https://fontlibrary.org/face/ferrum"]
    }
};

WebFont.load(wfConfig);

function startGame() {
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
  
    // Start Screen
    game.state.add('start', initialState);
    // About Screen
    game.state.add('about', aboutState);
    // Training Screen
    game.state.add('tLevel1', t1State);
    game.state.add('tLevel2', t2State);
    game.state.add('training', trainingState);
   
    
    // Play Screen
    game.state.add('level1', level1State);
    game.state.add('level2', level2State);
    //game.state.add('end', endState);
    

    game.state.start('start');
}
