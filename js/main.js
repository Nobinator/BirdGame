
// Создаем game instance
var g = new Phaser.Game(/*window.innerWidth, window.innerHeight*/600,800,Phaser.AUTO,'game',{preload: preload,create: create,update: update, render: render});

/*

 http://localhost/PhaserProjects/BirdGame/index.html

 */


function preload(){
    loadAssets();
    preloadUI();

}

function create(){

    setupEnviroment();
    instantiateGameObjects();
    loadUI();

    readParameters();

    getGameHighScores();

    // Повторение enemies.push каждую секунду
    g.time.events.loop(Phaser.Timer.SECOND, enemies.push, this);

}

function update(){

    handleInput();

    // Обработка пересечений bird и enemiesс коллбеком collisionHandler
    g.physics.arcade.overlap(bird, enemies, collisionHandler, null, this);

    enemies.forEach(function(enemy){
        if(enemy.isActive && enemy.y > g.world.height){
            enemy.pop();
        }
    });
}

function render(){

}


var breadparts = 4;
/*getBreadCount = function(){
    return breadparts;
};*/

function decreaseBread(){
    breadparts -= 1;
    ui.breadtext.setText('Bread parts : ' + breadparts);
    if(breadparts<1){
        //gameover();
    }
}


collisionHandler = function(obj1, obj2){
    //console.log('[ # ] Kicked!');
    obj2.kick();
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