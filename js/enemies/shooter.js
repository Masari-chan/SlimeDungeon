export default class Shooter extends Phaser.Sprite{
    health;

    constructor( game, x, y, health, target){
        super(game, x, y);
        this.health = health;
        this.target = target;
    }

    getHit( damage ){
        this.health -= damage;
        console.log( "Me han dado. Me quedan" + this.health + " puntos de vida.");
        // if ( this.health <= 0 ) {
        //     this.destroy();
        // }
    }

    aimAtTarget( ) {
        this.rotation = game.physics.arcade.angleBetween(this, this.target);
    }

    update() {
        this.aimAtTarget();
    }
}