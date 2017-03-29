var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{preload: preload,create: create,update: update});

/* Свалка какого-то кода */
/*









 //game.create.texture('palette', ['0123456789ABCDEF'], 800/16, 40);

 //game.create.texture('Y', ['7'], 64, 64);
 //game.create.texture('G', ['2'], 64, 64);
 //game.create.texture('Bread', ['6'], 64, 64);

 /*game.add.text(16, 48,'ouch', { fill: '#000000' });
 game.add.sprite(0,0,'palette');*/





















*/
var ground;

var boxes;

function preload() {

    game.load.image("boxB", "assets/CrateBlue.png");
    game.load.image("boxG", "assets/CrateGreen.png");
    game.load.image("boxR", "assets/CrateRed.png");
    game.load.image("boxW", "assets/CrateWood.png");
    game.load.image("boxI", "assets/CrateIron.png");

    game.load.image("markB", "assets/MarkBlue.png");
    game.load.image("markG", "assets/MarkGreen.png");
    game.load.image("markR", "assets/MarkRed.png");
    game.load.image("markW", "assets/MarkWood.png");

    ground = game.load.image("ground", "assets/Ground.png");

}

var plat;
var hero;
var cursors;
var items;

var score = 0;
var scoreText;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //ground = game.add.tileSprite(0,0,800,600,"ground");

    plat = game.add.group();
    plat.enableBody = true;
    var box = plat.create(40,40,'boxB');
    //box.scale.setTo(2, 2);
    box.body.immovable = true;
    hero = game.add.sprite(game.world.centerX,game.world.centerY,'boxW');
    game.physics.arcade.enable(hero);
    hero.body.bounce.y = 0.2;
    hero.body.gravity.y = 300;
    hero.body.collideWorldBounds = true;

    //hero.body.velocity.x = 150;


    cursors = game.input.keyboard.createCursorKeys();

    items = game.add.group();
    items.enableBody = true;

    //  Создаем 12 звезд с отступами между ними
    for (var i = 0; i < 12; i++)
    {
        //  Создаем звезду и добавляем его в группу "stars"
        var it = items.create(i * 70, 0, 'markG');

        //  Добавляем гравитацию
        it.body.gravity.y = 6;

        // Для каждой звезды указываем свою амплитуду отскока
        it.body.bounce.y = 0.7 + Math.random() * 0.2;

        it.body.collideWorldBounds = true;
    }

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

}

function collectItem (player, item) {

    // Removes the star from the screen
    item.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function update() {

    //  Проверка на столкновение игрока с полом
    //game.physics.arcade.collide(hero, plat);
    //game.physics.arcade.collide(items, hero);
    game.physics.arcade.overlap(hero, items, collectItem, null, this);

    //  Обнулим скорость перемещения персонажа в пространстве
    hero.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Движение влево
        hero.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        //  Движение вправо
        hero.body.velocity.x = 150;
    }
    else
    {
        //  Состояние покоя
    }

    //  Высота прыжка
    if (cursors.up.isDown /*&& hero.body.touching.down*/)
    {
        hero.body.velocity.y = -350;
    }

}
