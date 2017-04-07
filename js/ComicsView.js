/**
 * Created by Nobinator on 05.04.2017.
 */





function ComicsView(){

    const FADEOUT_DURATION = 1000;
    const MOVE_DURATION = 1000;
    const DELAY = 2500;
    const CV_DISABLED = 0;
    const CV_ENABLED = 1;



    var comic1,comic2;

    var status = CV_DISABLED;

    this.init = function(){
        g.load.image('comic1', 'assets/comics/comic1.png');
        g.load.image('comic2', 'assets/comics/comic2.png');
    };

    this.showComics = function(completeCallback){

        comic1 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic1');
        comic2 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic2');
        comic1.anchor.setTo(0.5);
        comic2.anchor.setTo(0.5);

        status = CV_ENABLED;

        showComic(comic1,function(){
            hideComic(comic1,DELAY);
            showComic(comic2,function() {
                    hideComic(comic2,DELAY,function(){
                        if(status !== CV_DISABLED)
                            completeCallback();
                        status = CV_DISABLED;
                    });
            },DELAY)
        });

    };

    var showComic = function(obj,completeCallback,delay){
        g.add.tween(obj.position).to({y: g.world.centerY}, MOVE_DURATION, null, true, delay || 0).onComplete.add(completeCallback,this);
        //active.push(obj);
    };

    var hideComic = function(obj,delay,callBack){
        g.add.tween(obj).to({alpha: 0}, FADEOUT_DURATION, null, true, delay || 0).onComplete.add(
            function(){
                resetComic(obj);
                if(typeof callBack !== "undefined")callBack();
            }
            ,this);
    };

    var resetComic = function(obj){
        g.tweens.removeFrom(obj,true);
        obj.position = { x : g.world.centerX, y : g.world.height*2};
        obj.alpha = 1;
    };

    this.stop = function(){
        // TODO Как то раздобыть активные спрайты
        resetComic(comic1);
        resetComic(comic2);
        status = CV_DISABLED;
    };

    this.isEnabled = function(){
        return status === CV_ENABLED;
    }

};


