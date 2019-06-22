

var aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

var author3;

function loadAboutAssets() {
    game.load.audio('buttonClick', 'assets/snds/button.wav');
    game.load.image('bkAbout','assets/imgs/bgAbout.png');

    game.load.image('backButton', 'assets/imgs/backButton.png');
}

function showInstructions() {
    buttonSound=game.add.audio('buttonClick');
    game.add.image(0, 0,'bkAbout');

    //game.stage.backgroundColor = "#0x2d2d2d";

    var textTitle = 'Slime Dungeon';
    var styleTitle = {font: 'Nosifer', fontSize: '40pt', fontWeight: 'bold', fill: '##0x2d2d2d'};
    game.add.text(game.world.height/2-200, 40, textTitle, styleTitle);

    var author = 'Author:';
    game.add.text(125, game.world.height -450, author, {font: 'bold 20pt Sniglet', fill: '##0x2d2d2d'});

    author1 = game.add.text(150, game.world.height / 6 + 100, 'María Saborit Ribelles',
            { font: 'bold 18pt Sniglet', fill: '##0x2d2d2d' });
    author1.inputEnabled = true;
    author1.events.onInputOver.add(overText, this);
    author1.events.onInputOut.add(outText, this);
    
    var instructions = 'The game consists of collecting apples in a limited time: \n';
    instructions += '-You can throw jelly beans.\n ';
    instructions += '-If an enemy attack you, your life bar is reduced. \n ';
    instructions += '-If the time runs out, then the slime will die and the user will be redirected to the \n';
    instructions +=  'end-game screen.\n'
    instructions += '-Mud soil slows down the character’s movement while icy soil speeds it up.\n'
    instructions += '-Once all the apples are collected, the door will open to the next level.\n';
    
    var instrucText = game.add.text(0, 0, instructions, { font: '14pt Sniglet', fill: '##0x2d2d2d' });
    instrucText.setTextBounds(30, game.world.height-230, game.world.width-50);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.world.width-60;
    
    var btnPlay = game.add.button(game.world.width / 2, game.world.height - 60, 'backButton', onBackButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
    btnPlay.scale.setTo(0.7);
}

function onBackButtonPressed() {
    buttonSound.play();
    game.state.start('start');
}

function overText(text, pointer) {
    text.fill = '#0e0eb3';
}

function outText(text, pointer) {
    text.fill = '#b60404';
}
