class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.jumpHeight = -21;
        this.FPS = 60;
        this.runWhileLoop = true;
        this.runGame = true;
        this.gameOver = false;
        this.angle = 0;
        this.timer = 0;
    }

    preload() {
        this.load.image('sky', './images/player/player_walk_1.png');
        this.load.image('ground', './images/ground.png');
        this.load.image('player', './images/player/player_walk_1.png');
        this.load.image('gameOverText', './images/gameState_assets/gameOver_text.png');
        this.load.image('retryButton', './images/gameState_assets/retry_button.png');
        this.load.image('lizard', './images/lizard/lizard (1).png');
    }

    create() {
        this.add.image(400, 300, 'sky');
        let ground = this.physics.add.staticGroup();
        ground.create(400, 568, 'ground').setScale(2).refreshBody();

        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(this.jumpHeight);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [GameScene]
};

new Phaser.Game(config);
