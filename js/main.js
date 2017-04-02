
// Создаем game instance
var g = new Phaser.Game(/*window.innerWidth, window.innerHeight*/600,800,Phaser.AUTO,'game',{preload: preload,create: create,update: update, render: render});

/*

 http://localhost/PhaserProjects/BirdGame/index.html

*/

var boot,ui;

function preload(){
    boot = new Boot();
    boot.loadAssets();
    boot.setupPoints();

    ui = new Ui();
}

function create(){

    boot.setupEnviroment();
    instantiateGameObjects();
    ui.loadUi();

    start();
}

function update(){

    handleInput();

    // Обработка пересечений bird и enemiesс коллбеком collisionHandler
    g.physics.arcade.overlap(bird, enemies, collisionHandler, null, this);

    enemies.forEach(function(enemy){
        // Удаляем упавших слишком низко птиц
        if(enemy.isActive && enemy.y > g.world.height){
            enemy.pop();
        }
    });
}

function render(){

}

collisionHandler = function(obj1, obj2){
    //console.log('[ # ] Kicked!');
    if(obj2.kick()) {
        increaseScore();
    }
};

handleInput = function(){

    if (g.input.keyboard.justPressed(Phaser.Keyboard.Q)){
        //top-left
        bird.jumpTo(0);

    } else if (g.input.keyboard.justPressed(Phaser.Keyboard.E)){
        //top - right
        bird.jumpTo(1);
    } else if (g.input.keyboard.justPressed(Phaser.Keyboard.A)){
        //bot-left
        bird.jumpTo(2);

    } else if (g.input.keyboard.justPressed(Phaser.Keyboard.D)){
        //bottom-right
        bird.jumpTo(3);

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