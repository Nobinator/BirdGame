var game = new Phaser.Game(window.innerWidth, window.innerHeight,Phaser.AUTO,'game',{preload: preload,create: create,update: update, render: render});


/*

 http://localhost/PhaserProjects/BirdGame/index.html

 */


var bird;
var bread;
var startPoint,endPoint,farPoint,flyPoint;
var enemies;

var zero;

var TLB,TRB,BLB,BRB;

function preload() {

    game.load.image('bird', 'assets/bird.png');
    game.load.image('ebird', 'assets/ebird.png');
    game.load.image('bread', 'assets/bread.png');
    game.load.image('back', 'assets/back.png');

    game.create.texture('button', ['7'], 80, 80);

    /*
     * Координаты даны в следующей последовательности
     *
     * [0] = TOP_LEFT
     * [1] = TOP_RIGHT
     * [2] = BOTTOM_LEFT
     * [3] = BOTTOM_RIGHT
     *
     * [1][2]
     * [3][4]
     *
     */

    zero = {x : game.world.centerX, y : game.world.centerY+64};

    // Отступ ЛЕВО/ПРАВО для стартовых точек
    const A = -64;
    // Отступ ВЕРХ/НИЗ для стартовых точек
    const B = game.world.centerY/1.4;

    startPoint = [
        {x : A, y : B},
        {x : game.world.width-A, y : B},
        {x : A, y : game.world.height-B},
        {x : game.world.width-A, y : game.world.height-B}];

    // Отступ ЛЕВО/ПРАВО для конечных точек (от центра)
    const C = 96;
    // Отступ ВЕРХ/НИЗ для стартовых точек (от центра)
    const D = 64;

    endPoint = [
        {x : zero.x-C, y : zero.y-D},
        {x : zero.x+C, y : zero.y-D},
        {x : zero.x-C, y : zero.y+D},
        {x : zero.x+C, y : zero.y+D}];

    farPoint = {x : -100, y : -100};
    flyPoint = {x : game.world.width*(4/5), y : -100};
}

function create() {

    // Заливаем фон цветом
    game.stage.backgroundColor = '#626973';

    var back = game.add.sprite(0,0, 'back');

    //=== Хлебушек в середине поля ============================================
    bread = game.add.sprite(zero.x,zero.y, 'bread');
    bread.anchor.setTo(0.5);
    bread.scale.setTo(0.8);
    //=========================================================================

    // Активируем физику!
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Создаем главного персонажа - птицу
    bird = birdInstance(zero.x, zero.y-64);

    // Создаем группу для враждебных птиц (Группа лучше чем массив, потому что с группой обжно обрабатывать коллизию легко)
    enemies = enemyManager();
    enemies.new(1);

    game.physics.arcade.enable(bird);


    // Повторение enemies.push каждую секунду
    game.time.events.loop(Phaser.Timer.SECOND, enemies.push, this);



    TLB = game.add.button(80, game.world.centerY - 80, 'button', click, this);
    TLB.id = 0;
    TLB.anchor.setTo(0.5);

    TRB = game.add.button(game.world.width -80, game.world.centerY - 80, 'button', click, this);
    TRB.id = 1;
    TRB.anchor.setTo(0.5);

    BLB = game.add.button(80, game.world.centerY + 80, 'button', click, this);
    BLB.id = 2;
    BLB.anchor.setTo(0.5);

    BRB = game.add.button(game.world.width -80, game.world.centerY + 80, 'button', click, this);
    BRB.id = 3;
    BRB.anchor.setTo(0.5);

}

function update() {
    handleInput();

    // Обработка пересечений bird и enemiesс коллбеком collisionHandler
    game.physics.arcade.overlap(bird, enemies, collisionHandler, null, this);

    enemies.forEach(function(enemy){
        if(enemy.isActive && enemy.y > game.world.height){
            enemy.pop();
        }
    });

}

function render() {

    //game.debug.body(bird);
    /*enemies.forEachAlive(function(sp){
     game.debug.body(sp);
     },this)*/
}

click = function(button){
    console.log('click : ' + button.id);
    bird.jumpTo(button.id);
};


collisionHandler = function(obj1, obj2){
    //console.log('[ # ] Kicked!');
    obj2.kick();
};

handleInput = function(){

    if (game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
        //top-left
        bird.jumpTo(0);

    } else if (game.input.keyboard.justPressed(Phaser.Keyboard.E)){
        //top - right
        bird.jumpTo(1);
    } else if (game.input.keyboard.justPressed(Phaser.Keyboard.A)){
        //bot-left
        bird.jumpTo(2);

    } else if (game.input.keyboard.justPressed(Phaser.Keyboard.D)){
        //bottom-right
        bird.jumpTo(3);

    }

};

birdInstance = function(a, b){
    var br = game.add.sprite(a,b, 'bird');
    br.anchor.setTo(0.5);

    br.basescale = 0.5;
    br.scale.setTo(br.basescale);

    br.jumpTo = function(wayId){
        this.scale.x = (2*(wayId===1 || wayId===3) -1)*this.basescale;
        this.moveTo(endPoint[wayId]);
    };

    // Перемещение птицы с анимациями в позицию [tox,toy]
    br.moveTo = function (pos) {
        // Съеживание до 0.6
        game.add.tween(this.scale).to({y: this.basescale*0.6}, 100, null, true).onComplete.add(function () {
            //console.log('CompletedA');
            // Проскальзывание в нужные координаты
            game.add.tween(this).to({x: pos.x, y: pos.y}, 50, null, true).onComplete.add(function () {
                //console.log('CompletedB');
                // Разжатие в нормальные размеры
                game.add.tween(this.scale).to({y: this.basescale}, 100, null, true);

            }, this);
        }, this);
    };

    return br;
};


enemyManager = function(){
    var g = game.add.group();

    g.new = function(count){
        // Забиваем массив враждебными птицами
        for (var i = 0; i < count; i++){
            (function(){
                // Создание нового объекта - спрайта
                var e = g.create(farPoint.x,farPoint.y, 'ebird');
                // Центровка
                e.anchor.setTo(0.5);

                e.basescale = 0.5;
                e.scale.setTo(e.basescale);

                e.speed = 128;// px per sec
                // Реализация шагов вперевалочку
                e.waddleright = function(){
                    var r = game.add.tween(this).to({angle: '+20'}, 500, null, true);r.onComplete.add(function () {this.waddleleft();},this);
                    r.start();
                };
                e.waddleleft = function(){
                    var l = game.add.tween(this).to({angle: '-20'}, 500, null, true);l.onComplete.add(function () {this.waddleright();},this);
                    l.start();
                };
                // Запуск анимации вперевалочку
                e.angle = -10;
                e.waddleright();
                // Реализация плавного перемещение в точку
                e.moveToEnd = function(pos){
                    var duration = (Phaser.Point.distance(this, pos) / this.speed) * 1000;
                    this.currtween = game.add.tween(this).to({x: pos.x, y: pos.y}, duration, null, true);
                    this.currtween.onComplete.add(function(){
                        //this.tint = 0xff0000; // red
                        console.log('[!!!] Enemy have reached the bread');

                        e.status = 'fly';
                        var duration = (Phaser.Point.distance(this, zero) / this.speed) * 200;
                        this.currtween = game.add.tween(this).to({x: zero.x, y: zero.y}, duration, null, true);
                        this.currtween.onComplete.add(function(){
                            this.flyAway();
                        },this);

                    },this);
                };

                e.flyAway = function(){
                    var duration = (Phaser.Point.distance(this, flyPoint) / this.speed) * 100;
                    this.currtween = game.add.tween(this).to({x: flyPoint.x, y: flyPoint.y}, duration, null, true);
                    this.currtween.onComplete.add(function(){
                        e.pop();
                    },this);
                };

                // Спавн инициирует перемещение объекта в начальную точку и запуск следования в конечную точку
                e.push = function(wayId){

                    //(wayId===1 || wayId===3)
                    //
                    // 1 =  1
                    // 0 = -1
                    // 2*x -1
                    this.scale.x = (2*(wayId===0 || wayId===2) -1)*this.basescale;
                    e.setPos(startPoint[wayId]);
                    this.moveToEnd(endPoint[wayId]);
                    //this.tint = 0xffbf00; // orange
                    e.isActive = true;
                    e.status = 'active';
                    e.wayId = wayId;
                };

                e.setPos = function(a){
                    e.x = a.x;
                    e.y = a.y;
                };

                e.pop = function(){
                    if(e.isActive) {

                        e.body.velocity.setTo(0);
                        e.body.acceleration.setTo(0);
                        e.setPos(farPoint);
                        e.currtween.stop();
                        //this.tint = 0x000000; // black
                        e.isActive = false;
                        e.status = 'free';
                        e.wayId = -1;
                    }
                };

                e.kick = function(){
                    if(e.status !== 'kicked') {
                        e.status = 'kicked';
                        e.currtween.stop();
                        e.body.velocity.y = this.game.rnd.integerInRange(-600, -1200);



                        if(e.wayId === 0 || e.wayId === 2) {
                            e.body.velocity.x = this.game.rnd.integerInRange(-500, -10);
                        }else{
                            e.body.velocity.x = this.game.rnd.integerInRange(10, 500);
                        }
                        e.body.acceleration.y = 3000;
                        console.log('Kicked!');
                    }


                };

                e.isActive = false;

                game.physics.arcade.enable(e);

            }());
        }
    };

    g.push = function(){

        var pushIt = function(item){
            var way = game.rnd.integerInRange(0, 3);
            item.push(way);
            //console.log('[ @ ] Enemy on the way : ',way);
        };

        var getInActive = function(){
            for (var i = 0; i < g.children.length; i++) {
                var n = g.getAt(i);
                if(!n.isActive){
                    return n;
                }
            }
            console.log('[ + ] +1 to enemies list. Len : ',g.children.length);
            g.new(1);

            //console.log('[ V ] New ',g.children.length);
            return g.getAt(g.children.length-1);
        };

        var e = getInActive();
        if(e !== undefined ) {
            //console.log('Spawned Item ', e);
            pushIt(e);
        }
    };

    return g;
};