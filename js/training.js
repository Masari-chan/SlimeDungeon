
var trainingState = {
    preload: loadTrainingAssets,
    create: chooseTrainingLevel
};

let lvl1, lvl2, nivel, btnBack;

function loadTrainingAssets() {
    game.load.image('level1Button', 'assets/imgs/level1Button.png');
    game.load.image('level2Button', 'assets/imgs/level2Button.png');
    game.load.image('backButton', 'assets/imgs/backButton.png');
    game.load.image('background','assets/imgs/background.png');
    game.load.audio('buttonClick','assets/snds/button.wav');
}

function chooseTrainingLevel() {
    //game.add.image(0, 0, 'bg');
    game.add.image(0, 0,'background');
    game.world.setBounds(0, 0, 800, 600);
    nivel='';
    buttonSound=game.add.audio('buttonClick');
    let textTitle = 'Choose a level for the training:';
    let styleTitle = {font: 'Rammetto One', fontSize: '20pt', fontWeight: 'bold', fill: 'white'};
    game.add.text(150, 60, textTitle, styleTitle);

    let vSpace = (game.world.height - 80) / 3;

    btn1 = game.add.button(game.world.width / 2, vSpace+50, 'level1Button', onButtonPressed);
    btn1.anchor.setTo(0.5, 0.5);
    btn2 = game.add.button(game.world.width / 2, vSpace * 2+10, 'level2Button', onButtonPressed);
    btn2.anchor.setTo(0.5, 0.5);
    let btnBack = game.add.button(game.world.width / 2, game.world.height - 60, 'backButton', onBackButtonPressed);
    btnBack.anchor.setTo(0.5, 0.5);

}

function onButtonPressed(button) {
    if (button === btn1) {
        game.state.start('tLevel1');
    }if(button ===btnBack){
        buttonSound.play();
        game.state.start('start');
    }else if (button === btn2) {
        game.state.start('tLevel2');
    }
    buttonSound.play();
    //game.state.start('start');
}
