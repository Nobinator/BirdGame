
var breadparts;

var score;

function decreaseBread(){
    breadparts -= 1;
    bread.frame = 4 - breadparts;
    if(breadparts<1){
        gameover();
    }
}

var spawnloop;

var lifestatus;

function start(){

    show(gamePanel);

    // Повторение enemies.push каждую секунду
    spawnloop = g.time.events.loop(Phaser.Timer.SECOND, enemies.push, this);

    breadparts = 4;
    bread.frame = 0;

    score = 0;

    lifestatus = 'start';

}

function gameover(){

    //send score
    //get highscore


    // Остановка цикла
    g.time.events.remove(spawnloop);
    enemies.popAll();

    setScoreText(score);
    show(leadPanel);

    lifestatus = 'gameover';
}

gameInput = {

    action : function(button){
        if(lifestatus = 'gameover'){
            start();
        }
        bird.jumpTo(button.id);
    }
};