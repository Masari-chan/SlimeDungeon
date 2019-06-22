var level1State = {
    preload: loadL1,
    create: createL1,
    update: updateL1
};
//---------------variables---------------

let slime;
let cursors;
let SLIME_VELOCITY = 400;
let SLIME_ACCELERATION = 5;
const HUD_HEIGHT = 50;
const MUD_FACTOR = 0.5;
const ICE_FACTOR = 4;
let currentSpeed = 0;
let bullets;
//---------------para le escenario---------------
let puerta;
let platforms, botPlatform, topPlatform, izqPlatform, derPlatform, izq_topPlatform, izq_botPlatform, der_topPlatform, der_botPlatform;

//--------------------
let fireRate = 100;
let nextFire = 0;
let fireButton;
//para las manzanas coleccionables
const VICTORY_POINTS = 10;
const TOTAL_APPLES = 10;
let stars;
let score = 0;
let scoreText;
let levelText;
let numApples;

let slideTiles;     // Teselas que aumentan la velocidad
let stickyTiles;    // Teselas que reducen el movimiento del personaje.
let speedFactor = 1;    // Factor de velocidad que interviene en el movimiento del personaje.

//---------------PRELOAD---------------
function loadL1() {
    game.load.audio('door', 'assets/snds/door.wav');
    game.load.image('slime', 'assets/imgs/slime1.png');//personaje
    game.load.image('bgT', 'assets/imgs/bgT.jpg');//fondo
    game.load.image('earth', 'assets/imgs/suelo.bmp');//suelo
    game.load.image('apple', 'assets/imgs/redApple.png');//manzanas coleccionables
    game.load.image('bot', 'assets/imgs/bot.png');
    game.load.image('top', 'assets/imgs/top.png');
    game.load.image('izq', 'assets/imgs/izq.png');
    game.load.image('der', 'assets/imgs/der.png');
    game.load.image('izqTop', 'assets/imgs/izq-top.png');
    game.load.image('izqBot', 'assets/imgs/izq-bot.png');
    game.load.image('derBot', 'assets/imgs/der-bot.png');
    game.load.image('derTop', 'assets/imgs/der-top.png');
    game.load.image('puerta', 'assets/imgs/puerta.png');
    game.load.image('wall', 'assets/imgs/pared-64-256.png')
    game.load.image('wall2', 'assets/imgs/pared-64-256-vertical.png')
    game.load.image('ice', 'assets/imgs/ice-tile-128.png');
    game.load.image('mud', 'assets/imgs/mud-tile-128.png');


};
//---------------CREATE---------------
function createL1() {
    //window.onload = function(){
    //primero creamos el fondo
    game.add.image(0, 0, 'bgT');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    doorSound=game.add.audio('door');


    //  Our tiled scrolling background
    land = game.add.tileSprite(0, 0, 1792, 1280, 'earth');
    // land.fixedToCamera = true;

    game.canvas.oncontextmenu = function (e) { e.preventDefault(); };// para que no salga el menu
    game.world.setBounds(0, 0, 1792, 1280);// mundo mas grande

    //createBullets();
    createGround();
    // initial value for numApples
    numApples = TOTAL_APPLES;

    //----ahora creamos el slime, si lo hacemos la reves, no se ve
    createSlime();
    createKeyControls();
    slime.body.maxVelocity = SLIME_VELOCITY;
    slime.body.collideWorldBounds = true;

    //  Finally some apples to collect
    apples = game.add.group();
    apples.enableBody = true;
   /* for (let i = 0; i < numApples; i++) {
        //  Create a apple inside of the 'apples' group
        let apple = apples.create(i *100+ 400, game.world.centerX - 200, 'apple');//<----------------------MODIFICAR PARA CAMBIAR POSICION DE LAS MANZANAS
        //let apple = apples.create(i *100+ 400, game.world.centerX - 200, 'apple');
        apple.scale.setTo(0.2, 0.2);
    }*/
    let apple1 = apples.create(100+ 400, game.world.centerX - 200, 'apple');
    apple1.scale.setTo(0.2, 0.2);
    let apple2 = apples.create(300+ 400, game.world.centerX - 200, 'apple');
    apple2.scale.setTo(0.2, 0.2);
    let apple3 = apples.create(800+ 400, game.world.centerX, 'apple');
    apple3.scale.setTo(0.2, 0.2);
    let apple4 = apples.create(800+ 400, game.world.centerX + 200, 'apple');
    apple4.scale.setTo(0.2, 0.2);
    let apple5 = apples.create(800+ 400, game.world.centerX -550, 'apple');
    apple5.scale.setTo(0.2, 0.2);
    let apple6 = apples.create(128,128, 'apple');
    apple6.scale.setTo(0.2, 0.2);
    let apple7 = apples.create(128,256+128, 'apple');
    apple7.scale.setTo(0.2, 0.2);
    let apple8 = apples.create(1664-64, 1152-64, 'apple');
    apple8.scale.setTo(0.2, 0.2);
    let apple9 = apples.create(1664-64, 128, 'apple');
    apple9.scale.setTo(0.2, 0.2);
    let apple10 = apples.create(1664-64, 512, 'apple');
    apple10.scale.setTo(0.2, 0.2);
    //i++;
    // The score
    scoreText = game.add.text(50, 500, score + '/10 ' , { fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 6 });
    scoreText.fixedToCamera = true;
    levelText = game.add.text(50, 650, 'Level ' + currentLevel, { fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 6 });
    levelText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(650, 500);
    levelText.cameraOffset.setTo(650, 540);




};


function createGround() {
    platforms = game.add.group();
    slideTiles = game.add.group();
    slideTiles.enableBody = true;
    stickyTiles = game.add.group();
    stickyTiles.enableBody = true;

    platforms.enableBody = true;
    //bot
    botPlatform = platforms.create(128, game.world.height - 128, 'bot');
    botPlatform.body.immovable = true;
    //top
    topPlatform = platforms.create(128, 0, 'top');
    topPlatform.body.immovable = true;
    //izq
    izqPlatform = platforms.create(0, 128, 'izq');
    izqPlatform.body.immovable = true;
    //der
    derPlatform = platforms.create(1664, 128, 'der');
    derPlatform.body.immovable = true;
    //izqTop
    izqTopPlatform = platforms.create(0, 0, 'izqTop');
    izqTopPlatform.body.immovable = true;
    //izqBot
    izqBotPlatform = platforms.create(0, 1152, 'izqBot');
    izqBotPlatform.body.immovable = true;
    //derTop
    derTopPlatform = platforms.create(1664, 0, 'derTop');
    derTopPlatform.body.immovable = true;
    //derBot
    derBotPlatform = platforms.create(1664, 1152, 'derBot');
    derBotPlatform.body.immovable = true;
    //WALLS
    let wall1=platforms.create(128, 256, 'wall');
    wall1.body.immovable = true;
    let wall2=platforms.create(128, 512, 'wall');
    wall2.body.immovable = true;
    let wall3=platforms.create(1280,256, 'wall');
    wall3.body.immovable = true;
    let wall4=platforms.create(1024,256, 'wall');
    wall4.body.immovable = true;
    let wall5=platforms.create(384, 256, 'wall');
    wall5.body.immovable = true;
    let wall6=platforms.create(1408,320, 'wall2');
    wall6.body.immovable = true;
    let wall7=platforms.create(1408,320+256, 'wall2');
    wall7.body.immovable = true;
    let wall8=platforms.create(1408,320+256+128, 'wall2');
    wall8.body.immovable = true;
    let wall9=platforms.create(1152-128,320, 'wall2');
    wall9.body.immovable = true;
    let wall10=platforms.create(1152-128,320+128+256, 'wall2');
    wall10.body.immovable = true;
    let wall11=platforms.create(1280,256+704, 'wall');
    wall11.body.immovable = true;
    let wall12=platforms.create(1280-256,256+704, 'wall');
    wall12.body.immovable = true;
    let wall13=platforms.create(1280-512,256+704, 'wall');
    wall13.body.immovable = true;
    let wall14=platforms.create(1280-512-256,256+704, 'wall');
    wall14.body.immovable = true;
    let wall15=platforms.create(1280-512-512,256+704, 'wall');
    wall15.body.immovable = true;
    let wall16=platforms.create(256+64,320+128+256, 'wall2');
    wall16.body.immovable = true;
    let wall17=platforms.create(256+64+256,320+128+256, 'wall2');
    wall17.body.immovable = true;
    let wall18=platforms.create(128+256, 512, 'wall');
    wall18.body.immovable = true;
    let wall19=platforms.create(256+64+256,320+128, 'wall2');
    wall19.body.immovable = true;

    // Ice tiles
    let iceT1 = slideTiles.create(game.world.centerX, 128, 'ice');
    iceT1.body.immovable = true;
    let iceT2 = slideTiles.create(game.world.centerX - 128, 128, 'ice');
    iceT2.body.immovable = true;
    let iceT3 = slideTiles.create(game.world.centerX - 256, 128, 'ice');
    iceT3.body.immovable = true;
    let iceT4 = slideTiles.create(game.world.centerX - 384, 128, 'ice');
    iceT3.body.immovable = true;
    let mud1 = stickyTiles.create(game.world.centerX, game.world.centerY - 200, 'mud');
    mud1.body.immovable = true;
    

};
/*function createBullets(){
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
};
*/
function createSlime() {
    let x = game.world.centerX;
    let y = game.world.centerY;
    slime = game.add.sprite(x, y, 'slime');
    slime.anchor.setTo(0.5, 0.5);
    slime.enableBody = true;//<--------------------------------------------------------------probando




}
;
function createKeyControls() {
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //We need to enable physics on the player
    game.physics.arcade.enable(slime);//habilitamos las fisicas de arcade para el personaje

    //fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};

/*
function resetMember(item) {
    item.kill();
}
function clearStage(item) {
    item.kill();
}
;

*/

function updateL1() {
    speedFactor = 1;
    game.physics.arcade.overlap( slime, slideTiles, slide, null, this);
    game.physics.arcade.overlap( slime, stickyTiles, stick, null, this);
    manageSlimeMovementsL1();
    game.camera.follow(slime);
    //  Checks to see if the player overlaps with any of the apples, if he does call the
    //  collectapple function
    game.physics.arcade.overlap(slime, apples, collectapple, null, this);

    // Overlap con las diferentes tiles
    /* Tiles de hielo */
    game.physics.arcade.collide(slime, platforms);
    if (puerta) { game.physics.arcade.collide(slime, puerta, doorCollide, null, this); }
    /* if (game.input.activePointer.leftButton.isDown || fireButton.isDown)
     {
         fire();
     }*/

};

/**
 * Gestiona que el jugador pise sobre una tile de hielo
 * @param {Object} slime objeto del jugador
 * @param {Object} tile tesela en la que se encuentra el jugador.
 */
function slide( slime, tile ) {
    speedFactor = ICE_FACTOR;
    currentSpeed += 20;
}

/**
 * Gestiona que el jugador pise sobre una tile de barro
 * @param {Object} slime objeto del jugador
 * @param {Object} tile tesela en la que se encuentra el jugador.
 */
function stick( slime, tile ) {
    speedFactor = MUD_FACTOR;
}


function collectapple(slime, apple) {
    // Removes the apple from the screen
    apples.remove(apple);
    apple.kill();
    numApples--;
    // Add and update the score
    score += 1;
    scoreText.text = score + '/10 ';


    // If there are no more apples
    if (numApples === 0) {
        apples.forEachDead(function (s) {
            s.revive();
            s.y = 0;
        });
        numApples = TOTAL_APPLES;
        let x = (slime.x < 400) ? Phaser.Math.between(400, 800) : Phaser.Math.between(0, 400);

    }

    // check if the player wins
    if (score === VICTORY_POINTS) {

        endGame();
    }
};


function endGame() {
    // Game Over
    gameOver = true;
    console.log(score);
    score = 0;
    puerta = game.add.sprite(40, game.world.centerY, 'puerta');
    game.physics.arcade.enable(puerta);
    puerta.enableBody = true;
    puerta.body.immovable = true;
    doorSound.play();
    /*
         // Stop slime
         slime.animations.stop();
         slime.frame = 4;
         slime.body.velocity.x = slime.body.velocity.y = 0;
    
          // Cleaning...
        apples.removeAll(true);*/

    // game.state.start('start');
};

function doorCollide(slime, puerta) {
    //fade out
    game.camera.fade(0x000000, 500);
    game.camera.onFadeComplete.add( goToStart, this );
}

function goToStart() {
    game.state.start('start');
}
/*
function fire(){

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(slime.x - 8, slime.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

};*/
function manageSlimeMovementsL1() {

    //controles horizontales

    /*
    //slime.body.velocity.x = 0;
      if (cursors.left.isDown || game.input.speed.x < 0)
   // if (cursors.left.isDown || game.input.mousePointer.x <= slime.x - 20 ) // si pulsa el boton izquierdo o mueve a la izquierda el raton
        slime.body.velocity.x = -SLIME_VELOCITY;// se mueve a la izquierda la nave
    else if (cursors.right.isDown || game.input.speed.x > 0)
    //else if (cursors.right.isDown || game.input.mousePointer.x > slime.x)//aquí al reves
        slime.body.velocity.x = SLIME_VELOCITY;
    //controles verticales

    slime.body.velocity.y = 0;
    //if (cursors.up.isDown || game.input.mousePointer.y <= slime.y - 50) // si pulsa el boton izquierdo o mueve a la izquierda el raton
     if(cursors.up.isDown || game.input.speed.y < 0)
        slime.body.velocity.y = -SLIME_VELOCITY;// se mueve a la izquierda la nave
    //else if (cursors.down.isDown || game.input.mousePointer.y > slime.y)//aquí al reves
      else if(cursors.down.isDown || game.input.speed.y>0)
        slime.body.velocity.y = SLIME_VELOCITY;
    */

    if (cursors.left.isDown) {
        slime.angle -= 4;
    }
    if (cursors.right.isDown) {
        slime.angle += 4;
    } else {
        if (game.input.activePointer.withinGame) {
            slime.rotation = game.physics.arcade.angleToPointer(slime);
        }

    }

    if (cursors.up.isDown || game.input.activePointer.rightButton.isDown) {
        //  The speed we'll travel at
        //    currentSpeed = 300;
        // slime.body.acceleration = SLIME_ACCELERATION;
        if (currentSpeed < SLIME_VELOCITY * speedFactor) currentSpeed += SLIME_ACCELERATION;
        else { currentSpeed = SLIME_VELOCITY * speedFactor; }
    }
    else {
        if (currentSpeed > SLIME_VELOCITY * speedFactor){
            currentSpeed = SLIME_VELOCITY * speedFactor;
        }
        if (currentSpeed > 0) {
            currentSpeed -= 4;
        }
    }

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromRotation(slime.rotation, currentSpeed, slime.body.velocity);
    }

};
