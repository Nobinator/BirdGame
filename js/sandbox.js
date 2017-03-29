var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{preload: preload,create: create,update: update, render: render});


var box;

function preload() {
    game.load.image('box', 'assets/CrateWood.png');

    var pixelWidth = 6;
    var pixelHeight = 6;

    var chick = [
        '...55.......',
        '.....5......',
        '...7888887..',
        '..788888887.',
        '..888088808.',
        '..888886666.',
        '..8888644444',
        '..8888645555',
        '888888644444',
        '88788776555.',
        '78788788876.',
        '56655677776.',
        '456777777654',
        '.4........4.'
    ];

    game.create.texture('chick', chick, pixelWidth, pixelHeight);

    var palette = [
        '0123456789ABCDEF'
    ];

    game.create.texture('palette', palette, 40, 40);

}
function create() {

    // Инициализация аркадной физики
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // Цвет заднего фона
    game.stage.backgroundColor = '#888888';

    box = game.add.sprite(game.world.centerX,game.world.centerY,'box');
    box.anchor.setTo(0.5);


    // Активирование физики для box
    game.physics.arcade.enable(box);
    // Установка гравитации на 200 для всех
    game.physics.arcade.gravity.y = 200;
    // Увтановка отпрыгивания на 0.95
    box.body.bounce.y = 0.95;
    // Индивидуальная гравитация. Суммируется с общей.
    //box.body.gravity.y = -200;

    // Отскакивание от границ мира
    box.body.collideWorldBounds = true;
    box.body.bounce.x = 0.95;

    var chick = game.add.sprite(50,200,'chick');

    var palette = game.add.sprite(0,0,'palette');




}

function update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        box.body.velocity.setTo(-200, -200);
    }

    // Проверка на касание границ мира
    if(box.body.onFloor()){
        console.log("BOTTOM");
    }

    if(box.body.onCeiling()){
        console.log("TOP?");
    }

    if(box.body.onWall()){
        console.log("WALL");
    }
    //

}

function render() {

    //game.debug.bodyInfo(box, 32, 32);

}
