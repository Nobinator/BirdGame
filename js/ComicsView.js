function ComicsView(){

    const FADEOUT_DURATION = 1000;
    const MOVE_DURATION = 1000;
    const DELAY = 2500;
    const CV_DISABLED = 0;
    const CV_ENABLED = 1;

    var status = CV_DISABLED;

    var comicsPack = [];

    this.preload = function(){

        for (var i = 1; i<=7; i++){
            g.load.image('comic'+i, 'assets/comics/comic'+i+'.png');
        }
    };

    var co = function(id){
        var c = g.add.sprite(g.world.centerX, g.world.height*1.5, 'comic'+id);
        c.anchor.setTo(0.5);
        return c;
    };

    this.showComicsA = function(completeCallback){

        comicsPack[0] = [co(1),co(2)];

        status = CV_ENABLED;
        sequense(comicsPack[0],completeCallback);
    };

    this.showComicsB = function(completeCallback){

        comicsPack[1] = [co(3),co(4),co(5),co(6),co(7)];

        status = CV_ENABLED;
        sequense(comicsPack[1],completeCallback);
    };

    this.stop = function(){
        resetComic(comicsPack[0]);
        resetComic(comicsPack[1]);
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
        //console.log('Sequense : '+objs);

        showComic(objs[0],inner,0);
    };

    var showComic = function(obj,completeCallback,callBackParams,delay){
        //console.log('showComic : ',obj.key);
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
        //console.log('Reset : objs',objs);

        if(typeof(objs) === "undefined")
            return;

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


