
var DEFAULT_DAMAGE = 10;
var DEFAULT_HEALTH = 10;
var DEFAULT_TIME = 480;
var DEFAULT_JUMPS_TO_KILL = 2;
var BULLET_SPEED_FACTOR = 1;
var DEFAULT_PLAYER_DEATH_TIME_PENALTY = 15;
var currentLevel = 0;

var DEFAULT_CONTROLS='k';
var damage = DEFAULT_DAMAGE;
var healthAid = DEFAULT_HEALTH;
var secondsToGo = DEFAULT_TIME;
var jumpsToKill = DEFAULT_JUMPS_TO_KILL;
var playerDeathTimePenalty = DEFAULT_PLAYER_DEATH_TIME_PENALTY;

var controls=DEFAULT_CONTROLS;
var bulletSpeed=BULLET_SPEED_FACTOR;
var estadoJuego='LOST';
var tiempoFinal;
var mainTween, downTween1, downTween2;
var btnAbout, btnConfig, btnPlay;
var levelToPlay;



var initialState = {
    preload: loadAssets,
    create: displayScreen
};



function loadAssets() {
    game.load.audio('buttonClick', 'assets/snds/button.wav');
    //hero?
    game.load.image('start', 'assets/start.png', 30, 30);
    game.load.image('training', 'assets/training.png', 30, 30);
    game.load.image('about', 'assets/about.png', 30, 30);
    game.load.image('level1Button', 'assets/imgs/level1Button.png');
    game.load.image('level2Button', 'assets/imgs/level2Button.png');
    game.load.image('background','assets/imgs/background.png');
    game.load.image('slime1','assets/imgs/slime.png');
}

function displayScreen(){
    game.add.image(0, 0,'background');
    slime1 = game.add.image(580, 450,'slime1');
    slime1.scale.setTo(1.8,1.8);
    buttonSound=game.add.audio('buttonClick');
    game.stage.backgroundColor = "#0x2d2d2d";
    levelToPlay = 1;
    game.input.enabled = true;
    titleText = game.add.text(0, 15, "Slime Dungeon", {fontSize: '60px', fill: '#FA9503', boundsAlignH: "center", font: "Nosifer"});
    titleText.inputEnabled = false;
    titleText.setTextBounds(0, 5, 800, 100);
    let textTitle = '';
    let styleTitle = {font: 'Rammetto One', fontSize: '22pt', fontWeight: 'bold', fill: '#b60404'};
    game.add.text(50, game.world.height / 6, textTitle, styleTitle);
    trainingText = game.add.button(50, 250,'training', onTrainingButtonPressed);
    trainingText.scale.setTo(0.7);
    aboutText = game.add.button(50, 400,'about',onAboutButtonPressed);
    aboutText.scale.setTo(0.7);

    btn1 = game.add.button(300,200, 'level1Button', onLevel1ButtonPressed);
    btn1.scale.setTo(0.8, 0.8);
    btn2 = game.add.button(300,400, 'level2Button', onLevel2ButtonPressed);
    btn2.scale.setTo(0.8, 0.8);

}


function onAboutButtonPressed() {
    buttonSound.play();
    game.state.start('about');
}

function onTrainingButtonPressed() {
    buttonSound.play();
    game.state.start('training');
}

function onLevel1ButtonPressed() {
    buttonSound.play();
    currentLevel = 1;
    game.state.start('level1');
}

function onLevel2ButtonPressed() {
    buttonSound.play();
    currentLevel = 2;
    game.state.start('level2');
}
