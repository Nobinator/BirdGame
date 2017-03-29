var game = new Phaser.Game(800,600,Phaser.AUTO,'game',{preload: preload,create: create,update: update, render: render});


/*

 http://localhost/PhaserProjects/BirdGame/index.html

 */


var bird;
var bread;
var startPoint,endPoint,farPoint;
var enemies;

function preload() {

    //game.create.texture('Y', ['7'], 64, 64);
    //game.create.texture('G', ['2'], 64, 64);
    //game.create.texture('Bread', ['6'], 64, 64);

    game.load.image('bird', 'assets/bird.png');
    game.load.image('ebird', 'assets/ebird.png');
    game.load.image('bread', 'assets/bread.png');

    game.create.texture('palette', ['0123456789ABCDEF'], 800/16, 40);

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

    // Отступ ЛЕВО/ПРАВО для стартовых точек
    const A = -64;
    // Отступ ВЕРХ/НИЗ для стартовых точек
    const B = game.world.centerY/2;

    startPoint = [
        {
            x : A,
            y : B},
        {
            x : game.world.width-A,
            y : B},
        {
            x : A,
            y : game.world.height-B},
        {
            x : game.world.width-A,
            y : game.world.height-B}];

    // Отступ ЛЕВО/ПРАВО для конечных точек (от центра)
    const C = 96;
    // Отступ ВЕРХ/НИЗ для стартовых точек (от центра)
    const D = 96;

    endPoint = [
        {x : game.world.centerX-C, y : game.world.centerY-D},
        {x : game.world.centerX+C, y : game.world.centerY-D},
        {x : game.world.centerX-C, y : game.world.centerY+D},
        {x : game.world.centerX+C, y : game.world.centerY+D}];

    farPoint = {x : -100, y : -100};

}

function create() {

    // Заливаем фон цветом
    game.stage.backgroundColor = '#CFFFF2';



    //=== Текст и палитра вверху экрана для удобства ==========================
    /*game.add.text(16, 48,
        '0\t\t\t\t\t1\t\t\t\t\t2\t\t\t\t\t' +
        '3\t\t\t\t\t4\t\t\t\t\t5\t\t\t\t\t' +
        '6\t\t\t\t7\t\t\t\t\t8\t\t\t\t9\t\t\t\t' +
        'A\t\t\t\tB\t\t\t\t\tC\t\t\t\tD\t\t\t' +
        'E\t\t\t\tF', { fill: '#000000' });
    game.add.sprite(0,0,'palette');*/
    //=========================================================================



    //=== Хлебушек в середине поля ============================================
    bread = game.add.sprite(game.world.centerX, game.world.centerY, 'bread');
    bread.anchor.setTo(0.5);
    bread.scale.setTo(0.8);
    //=========================================================================

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Создаем главного персонажа - птицу
    bird = birdInstance(game.world.centerX, game.world.centerY-64);

    bird.name = 'bird';

    // Создаем группу для враждебных птиц (Группа лучше чем массив, потому что с группой обжно обрабатывать коллизию легко)
    enemies = enemyManager();
    enemies.new(1);

    //=== Физика ==============================================================

    game.physics.arcade.enable(enemies);
    game.physics.arcade.enable(bird);
    //=========================================================================


    // Повторение enemies.push каждую секунду
    game.time.events.loop(Phaser.Timer.SECOND, enemies.push, this);



}

function update() {
    handleInput();

    //console.log('P>>',enemies.getAt(0).position);

    game.physics.arcade.overlap(bird, enemies, collisionHandler, null, this);

}

function render() {

    //game.debug.body(bird);
    /*enemies.forEachAlive(function(sp){
     game.debug.body(sp);
     },this)*/
}


collisionHandler = function(obj1, obj2){
    console.log('[-> ] Hit!');
    obj2.pop();
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
                        console.log('[ ! ] Enemy have reached the bread');
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
                };

                e.setPos = function(a){
                    e.x = a.x;
                    e.y = a.y;
                };

                e.pop = function(){
                    if(e.isActive) {
                        e.setPos(farPoint);
                        e.currtween.stop();
                        //this.tint = 0x000000; // black
                        e.isActive = false;
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
            console.log('[ + ] New enemy. Way : ',way);
        };

        var getInActive = function(){
            for (var i = 0; i < g.children.length; i++) {
                var n = g.getAt(i);
                if(!n.isActive){
                    console.log('[ V ] Enemy status : free');
                    return n;
                }
            }
            console.log('[ V ] Enemy status : new',g.children.length);
            g.new(1);

            console.log('[ V ] New ',g.children.length);
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