/**
 * Created by Nobinator on 05.04.2017.
 */





function ComicsView(){

    const FADEOUT_DURATION = 1000;
    const MOVE_DURATION = 1000;
    const DELAY = 2500;
    const CV_DISABLED = 0;
    const CV_ENABLED = 1;

    var comicPackA;
    var comicPackB;
    var status = CV_DISABLED;

    this.preload = function(){

        for (var i = 1; i<=2; i++){
            g.load.image('comic'+i, 'assets/comics/comic'+i+'.png');
            console.log('Loaded : comic'+i+'.png');
        }
    };

    this.create = function(){

        var loadComics = function(a,b){

            //var pack = [];

            /*for (var i = a; i<=b; i++){
                var c = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic'+i);
                console.log('Added : comic'+i);
                c.anchor.setTo(0.5);
                pack.push(c);
                console.log('Pack : '+pack);
            }*/

            //return pack;
            var c1 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic1');
            c1.anchor.setTo(0.5);
            var c2 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic2');
            c2.anchor.setTo(0.5);
            return [c1,c2];
        };

        comicPackA = loadComics(1,2);
        console.log('Comic pack :',comicPackA);
    };

    var comic1,comic2;
    var comicsPack = [];

    this.showComics = function(completeCallback){

        comic1 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic1');
        comic2 = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic2');
        comic1.anchor.setTo(0.5);
        comic2.anchor.setTo(0.5);

        comicsPack[0] = [comic1,comic2];

        status = CV_ENABLED;
        sequense(comicsPack[0],completeCallback);

    };

    this.stop = function(){
        resetComic(comicPackA);
        status = CV_DISABLED;
    };

    this.isEnabled = function(){
        return status === CV_ENABLED;
    };

    // Запускает спрайты один за другим (только не надо засовывать два одинаковых друг за другом)
    var sequense = function(objs,completeCallback){

        var endfu = function(){
            if(status !== CV_DISABLED)
                completeCallback();
            status = CV_DISABLED;
        };

        var inner = function(id){
            if(id+1 === objs.length){
                //last
                hideComic(objs[id], DELAY,endfu);
            }else {
                hideComic(objs[id], DELAY);
                showComic(objs[id+1], inner,id + 1, DELAY);
            }
        };
        console.log('Sequense : '+objs);

        showComic(objs[0],inner,0);
    };

    var showComic = function(obj,completeCallback,callBackParams,delay){
        console.log('showComic : ',obj.key);
        g.add.tween(obj.position).to({y: g.world.centerY}, MOVE_DURATION, null, true, delay || 0).onComplete.add(
            function(){completeCallback(callBackParams);},this);
    };

    var hideComic = function(obj,delay,callBack){
        g.add.tween(obj).to({alpha: 0}, FADEOUT_DURATION, null, true, delay || 0).onComplete.add(
            function(){
                resetComic(obj);
                if(typeof callBack !== "undefined")callBack();
            }
            ,this);
    };

    var resetComic = function(objs){
        console.log('Reset : objs',objs);

        var hde = function(obj){
            g.tweens.removeFrom(obj,true);
            obj.position = { x : g.world.centerX, y : g.world.height*2};
            obj.alpha = 1;
        };

        if(objs instanceof Array)
            objs.forEach(function(item){hde(item)});
        else
            hde(objs);
    };

}


