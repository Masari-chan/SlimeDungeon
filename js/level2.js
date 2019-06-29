var level2State = {
    preload: loadL2,
    create: createL2,
    update: updateL2
};

const SHOOTER_HEALTH = 100;
let shooters;

function loadL2() {
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
    game.load.image('spike', 'assets/imgs/spike64-64.png');
    game.load.image('bullet', 'assets/imgs/purple_ball.png');//proyectil
}

function createL2() {
    //window.onload = function(){
    //primero creamos el fondo
    game.add.image(0, 0, 'bgT');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    doorSound = game.add.audio('door');
    ball = game.add.audio('ball');

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
    createShooters();
    createKeyControls();
    createBullets();
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
    let apple1 = apples.create(100 + 400, game.world.centerX - 200, 'apple');
    apple1.scale.setTo(0.2, 0.2);
    let apple2 = apples.create(300 + 400, game.world.centerX - 200, 'apple');
    apple2.scale.setTo(0.2, 0.2);
    let apple3 = apples.create(800 + 400, game.world.centerX, 'apple');
    apple3.scale.setTo(0.2, 0.2);
    let apple4 = apples.create(800 + 400, game.world.centerX + 200, 'apple');
    apple4.scale.setTo(0.2, 0.2);
    let apple5 = apples.create(800 + 400, game.world.centerX - 550, 'apple');
    apple5.scale.setTo(0.2, 0.2);
    let apple6 = apples.create(128, 128, 'apple');
    apple6.scale.setTo(0.2, 0.2);
    let apple7 = apples.create(128, 256 + 128, 'apple');
    apple7.scale.setTo(0.2, 0.2);
    let apple8 = apples.create(1664 - 64, 1152 - 64, 'apple');
    apple8.scale.setTo(0.2, 0.2);
    let apple9 = apples.create(1664 - 64, 128, 'apple');
    apple9.scale.setTo(0.2, 0.2);
    let apple10 = apples.create(1664 - 64, 512, 'apple');
    apple10.scale.setTo(0.2, 0.2);
    //i++;
    // The score
    scoreText = game.add.text(50, 500, score + '/10 ', { fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 6 });
    scoreText.fixedToCamera = true;
    levelText = game.add.text(50, 650, 'Level ' + currentLevel, { fontSize: '32px', fill: '#fff', stroke: '#000', strokeThickness: 6 });
    levelText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(650, 500);
    levelText.cameraOffset.setTo(650, 540);
}

function createShooters() {
    shooters = game.add.group();
    shooters.enableBody = true;
    let shoot1 = new Shooter(game, game.world.width / 2, 128, SHOOTER_HEALTH, slime, 'slime');
    shooters.add(shoot1);
}

function updateL2() {
    speedFactor = 1;
    game.physics.arcade.overlap(slime, slideTiles, slide, null, this);
    game.physics.arcade.overlap(slime, stickyTiles, stick, null, this);
    manageSlimeMovementsL1();
    game.camera.follow(slime);
    //  Checks to see if the player overlaps with any of the apples, if he does call the
    //  collectapple function
    game.physics.arcade.overlap(slime, apples, collectapple, null, this);

    // Overlap con las diferentes tiles
    /* Tiles de hielo */
    game.physics.arcade.collide(slime, platforms);
    game.physics.arcade.collide(slime, spikcyObstacles);
    if (puerta) { game.physics.arcade.collide(slime, puerta, doorCollide, null, this); }
    if (game.input.activePointer.leftButton.isDown || fireButton.isDown) {
        fire();
    }

}

class Shooter extends Phaser.Sprite {
    health;
    shooterSprite;

    constructor(game, x, y, health, target, sprite) {
        super(game, x, y, sprite);
        this.health = health;
        this.target = target;
        this.anchor.setTo(0.5, 0.5);
        // // Sustituir luego el 'slime' de aquí por el sprite que sea
        // this.shooterSprite = this.addChild(game.add.sprite(0, 0, 'slime'));
    }

    getHit(damage) {
        this.health -= damage;
        console.log("Me han dado. Me quedan" + this.health + " puntos de vida.");
        // if ( this.health <= 0 ) {
        //     this.destroy();
        // }
    }

    shoot() {
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
    }

    aimAtTarget() {
        this.rotation = game.physics.arcade.angleBetween(this, this.target);
    }

    update() {
        this.aimAtTarget();
        enemyFire(this);
    }
}