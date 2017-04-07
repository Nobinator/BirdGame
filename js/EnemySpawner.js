

var START_RATE = 1000; // one per sec
var MAX_RATE = 1000 / 4; // four per sec
var RATE_STEP = 100;

var SPEEDUP_RATE = 5000; // once per 5 sec

function EnemySpawner(enemies){


    var e = enemies;
    var events = g.time.events;

    var deployAnEnemy = function(){
        console.log('deploy');
        e.deploy();
    };

    var speedUp = function(){

        if(getCurrentSpawnRate===MAX_RATE)
            return;

        loop.delay -= RATE_STEP;
        if(getCurrentSpawnRate()<MAX_RATE){
            loop.delay = MAX_RATE - loop.timer.duration;
        }
        console.log('New Rate : ',getCurrentSpawnRate());
    };

    var loop = events.loop(START_RATE, deployAnEnemy, this);
    var sul = events.loop(SPEEDUP_RATE, speedUp, this);

    events.pause();


    this.start = function(){
        events.resume();
        console.log('Циклы запущены');
    };

    this.stop = function(){
        events.pause();
        console.log('Циклы остановлены');
    };



    var getCurrentSpawnRate = function(){
        return loop.timer.duration+loop.delay;
    }



















};