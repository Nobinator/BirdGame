
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

    start();
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

collisionHandler = function(obj1, obj2){
    //console.log('[ # ] Kicked!');
    if(obj2.kick())
        score +=1;
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