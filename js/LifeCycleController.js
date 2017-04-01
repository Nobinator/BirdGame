
var spawnloop;

function start(){

    hideLead();
    // Повторение enemies.push каждую секунду
    spawnloop = g.time.events.loop(Phaser.Timer.SECOND, enemies.push, this);

}

function gameover(){

    //send score
    //get highscore


    // Остановка цикла
    g.time.events.remove(spawnloop);

    showLead();
}