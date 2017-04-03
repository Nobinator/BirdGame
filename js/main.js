
// Создаем game instance
var g = new Phaser.Game(/*window.innerWidth, window.innerHeight*/600,800,Phaser.AUTO,'game',{preload: preload,create: create,update: update, render: render});

/*

 http://localhost/PhaserProjects/BirdGame/index.html

*/

var boot,ui,gameObject,input,gameManager;

function preload(){

    new TestObject();

    boot = new Boot();
    boot.loadAssets();
    boot.setupPoints();

    ui = new Ui();
    gameManager = new GameManager();
}

function create(){

    boot.setupEnviroment();
    gameObject = new GameObject();
    input = new GameInput();
    ui.loadUi();
    ui.showLead();
    input.setCurrAction(gameManager.start);

    debug();
}

function update(){

    input.handleI();

    // Обработка пересечений bird и enemiesс коллбеком collisionHandler
    gameObject.enemies.getBodies().forEach(function(item){
        g.physics.arcade.overlap(gameObject.bird.getBody(), item, collisionHandler, null, this);
    });

    gameObject.enemies.undeployFallen();
}

function render(){
    gameObject.enemies.getBodies().forEach(function(item){
        g.debug.body(item);
    });

    g.debug.body(gameObject.bird.getBody());
}

function debug(){
    var graphics = g.add.graphics(0, 0);
    graphics.beginFill(0xFF33CC);
    endPoint.forEach(function(it){
        graphics.drawRect(it.x, it.y, 4, 4);
    });
    graphics.beginFill(0xFFFF66);
    startPoint.forEach(function(it){
        graphics.drawRect(it.x, it.y, 4, 4);
    });


    //window.graphics = graphics;
    //graphics.destroy();
}

collisionHandler = function(obj1, obj2){
    //console.log('[ # ] Kicked!');
    if(obj2.inst.kick()) {
        gameManager.addScore(1);
    }
};

// Коллбек загрузки шрифтов гугловых
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    active: function(){ g.time.events.add(Phaser.Timer.SECOND, ui.updateFont, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: { families: ['Montserrat'] }

};