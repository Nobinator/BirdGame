/**
 * Created by Nobinator on 05.04.2017.
 */



var FADEOUT_DURATION = 1000;
var MOVE_DURATION = 1000;
var DELAY = 2500;

function ComicsView(){


    this.init = function(){
        g.load.image('comic1', 'assets/comics/comic1.png');
        g.load.image('comic2', 'assets/comics/comic2.png');
    };

    this.showComics = function(completeCallback){

        var comic1 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic1');
        var comic2 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic2');
        comic1.anchor.setTo(0.5);
        comic2.anchor.setTo(0.5);

        showComic(comic1,function(){
            hideComic(comic1,DELAY);
            showComic(comic2,function() {
                    hideComic(comic2,DELAY,completeCallback);
            },DELAY)
        });

    };

    var showComic = function(obj,completeCallback,delay){
        g.add.tween(obj.position).to({y: g.world.centerY}, MOVE_DURATION, null, true, delay || 0).onComplete.add(completeCallback,this);
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
        obj.position = { x : g.world.centerX, y : g.world.height*2};
        obj.alpha = 1;
    };

};


