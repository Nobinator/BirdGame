

var START_RATE = 1000; // one per sec
var MAX_RATE = 1000 / 4; // four per sec
var RATE_STEP = 100;

var SPEEDUP_RATE = 5000; // once per 5 sec

function EnemySpawner(enemies){

    var lock = true;


    var e = enemies;
    var events = g.time.events;

    var deployAnEnemy = function(){
        if(lock)
            return;
        console.log('deploy');
        e.deploy();
    };

    var speedUp = function(){
        if(lock)
            return;

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


    this.start = function(){
        console.log('Циклы запущены');
        events.resume();
        lock = false;
        loop.delay = START_RATE;
    };

    this.stop = function(){
        events.pause();
        lock = true;
        console.log('Циклы остановлены');
    };



    var getCurrentSpawnRate = function(){
        return loop.timer.duration+loop.delay;
    }



















};