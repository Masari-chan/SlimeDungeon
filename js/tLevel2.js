var t2State = {
    preload: loadT2,
    create: createT2,
    update: updateT2
};

//---------------letiables---------------

//let slime;
//let cursors;
//let SLIME_VELOCITY = 400;
//let SLIME_ACCELERATION = 5;
const BULLET_SPEED = 300;

//let currentSpeed = 0;
//let bullets;

//let fireRate = 100;
//let nextFire = 0;
//let fireButton;

//---------------PRELOAD---------------
function loadT2() {
    game.load.audio('ball', 'assets/snds/ball.wav');
    game.load.image('slime', 'assets/imgs/slime1.png');//personaje
    game.load.image('bgT', 'assets/imgs/bgT.jpg');//fondo
    game.load.image('bullet', 'assets/imgs/purple_ball.png');//proyectil

}

function createT2() {
    //primero dibujamos el fondo tileado
    game.add.image(0, 0, 'bgT');
    ball = game.add.audio('ball');
    createBullets();
    //----ahora creamos el slime, si lo hacemos la reves, no se ve
    createSlime();
    createKeyControls();
    slime.body.maxVelocity = SLIME_VELOCITY;
    slime.body.collideWorldBounds = true;
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); };


    //boton back
    let btnBack2 = game.add.button(game.world.width / 2, game.world.height - 60, 'backButton', onButtonPressedT2);
    btnBack2.anchor.setTo(0.5, 0.5);
    btnBack2.scale.setTo(0.5, 0.5);
}
function createBullets() {
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
};

function createSlime() {
    let x = game.world.centerX;
    let y = game.world.centerY;
    slime = game.add.sprite(x, y, 'slime');
    slime.anchor.setTo(0.5, 0.5);




}
;
function createKeyControls() {
    cursors = game.input.keyboard.createCursorKeys();
    game.physics.arcade.enable(slime);//habilitamos las fisicas de arcade para el personaje
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};
function onButtonPressedT2() {
    buttonSound.play();
    game.state.start('training');
};



function updateT2() {
    manageSlimeMovements();
    if (game.input.activePointer.leftButton.isDown || fireButton.isDown) {
        fire();
    }

};
function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0) {
        nextFire = game.time.now + fireRate;

        let bullet = bullets.getFirstDead();

        bullet.reset(slime.x - 8, slime.y - 8);

        if (game.input.activePointer.withinGame) {
            game.physics.arcade.moveToPointer(bullet, BULLET_SPEED);
            ball.play();
        } else {
            game.physics.arcade.velocityFromRotation(slime.rotation, BULLET_SPEED, bullet.body.velocity);
            ball.play();
        }
    }

};

function enemyFire(enemy) {

    if (game.time.now > nextEnemyFire && bullets.countDead() > 0) {
        nextEnemyFire = game.time.now + enemyFireRate;

        let bullet = bullets.getFirstDead();

        bullet.reset(enemy.x - 8, enemy.y - 8);
        game.physics.arcade.velocityFromRotation(enemy.rotation, BULLET_SPEED, bullet.body.velocity);
        ball.play();
    }

};
function manageSlimeMovements() {

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
        if (currentSpeed < SLIME_VELOCITY) currentSpeed += SLIME_ACCELERATION;
    }
    else {
        if (currentSpeed > 0) {
            currentSpeed -= 4;
        }
    }

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromRotation(slime.rotation, currentSpeed, slime.body.velocity);
    }

}
;