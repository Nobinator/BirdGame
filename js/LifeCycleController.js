
var breadparts;

var score;

function decreaseBread(){
    breadparts -= 1;
    updBreadText(breadparts);
    if(breadparts<1){
        gameover();
    }
}

var spawnloop;

var lifestatus;

function start(){

    hideLead();
    // Повторение enemies.push каждую секунду
    spawnloop = g.time.events.loop(Phaser.Timer.SECOND, enemies.push, this);

    breadparts = 4;
    updBreadText(breadparts);

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
    showLead();

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