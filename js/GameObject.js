
function GameObject(){

    g.physics.startSystem(Phaser.Physics.ARCADE);

    var EnemyGroup =  function(){


        var set = [];
        var container = [];
        // Обертка обращение Enemy к gameManager;
        var decBread = function(){
            gameManager.decreaseBread();
        };

        this.deploy = function(){

            var pushIt = function(item){
                var way = g.rnd.integerInRange(0, 3);
                item.deploy(way);
                //console.log('[ @ ] Enemy on the way : ',way);
            };

            var getInActive = function(){
                for (var i = 0; i < container.length; i++) {
                    var n = container[i];
                    if(!n.isActive()){
                        return n;
                    }
                }
                console.log('[ + ] +1 to enemies list. Len : ',container.length);
                add(1);

                //console.log('[ V ] New ',g.children.length);
                return container[container.length-1];
            };

            var act = getInActive();
            if(act !== -1 ) {
                //console.log('Spawned Item ', e);
                pushIt(act);
            }
        };

        this.undeployAll = function(){
            for (var i = 0; i < container.length; i++) {
                container[i].undeploy();
            }
        };

        this.undeployFallen = function(){
            container.forEach(function(item){
                // Удаляем упавших слишком низко птиц
                if(item.isActive && item.isFallen()){
                    item.undeploy();
                }
            });
        };
        /* Добавление новой враждебной птицы */
        var add = function(count){
            // Забиваем массив враждебными птицами
            for (var i = 0; i < count; i++){
                container.push(new Enemy());
            }
        };

        var Enemy = function(){
            const FLY = 0;
            const FREE = 1;
            const KICKED = 2;
            const ACTIVE = 3;

            var wayId;
            var speed = 128;// px per sec
            var currTween;
            var status = FREE;
            var self = this;

            // for collide only
            this.getSprite = function(){
                return sprite;
            };
            this.isActive = function(){
                return status !== FREE;
            };
            // Спавн инициирует перемещение объекта в начальную точку и запуск следования в конечную точку
            this.deploy = function(wId){
                sprite.scale.x = (2*(wId===0 || wId===2) -1)*sprite.basescale;
                setPos(startPoint[wId]);
                moveToEnd(endPoint[wId]);
                //this.tint = 0xffbf00; // orange
                status = ACTIVE;
                wayId = wId;
            };
            this.undeploy = function(){
                if(status !==FREE) {
                    sprite.body.velocity.setTo(0);
                    sprite.body.acceleration.setTo(0);
                    setPos(farPoint);
                    currTween.stop();
                    //this.tint = 0x000000; // black
                    status = FREE;
                    wayId = -1;
                }
            };

            this.kick = function(){

                if(status === FLY || status === KICKED)
                    return false;

                currTween.stop();
                sprite.body.velocity.y = g.rnd.integerInRange(-600, -1200);

                if(wayId === 0 || wayId === 2) {
                    sprite.body.velocity.x = g.rnd.integerInRange(-500, -10);
                }else{
                    sprite.body.velocity.x = g.rnd.integerInRange(10, 500);
                }
                sprite.body.acceleration.y = 3000;
                console.log('Kicked!');

                status = KICKED;

                return true;
            };

            this.isFallen = function () {
                return sprite.y > g.world.height;
            };


            // Реализация шагов вперевалочку
            var waddleright = function(){
                var r = g.add.tween(sprite).to({angle: '+20'}, 500, null, true);r.onComplete.add(function () {waddleleft();},this);
                r.start();
            };
            var waddleleft = function(){
                var l = g.add.tween(sprite).to({angle: '-20'}, 500, null, true);l.onComplete.add(function () {waddleright();},this);
                l.start();
            };
            var flyAway = function(){
                decBread();
                var duration = (Phaser.Point.distance(sprite.position, flyPoint) / speed) * 100;
                currTween = g.add.tween(sprite.position).to({x: flyPoint.x, y: flyPoint.y}, duration, null, true);
                currTween.onComplete.add(self.undeploy,this);
            };
            // Реализация плавного перемещение в точку
            var moveToEnd = function(pos){
                var duration = (Phaser.Point.distance(sprite.position, pos) / speed) * 1000;
                currTween = g.add.tween(sprite.position).to({x: pos.x, y: pos.y}, duration, null, true);
                currTween.onComplete.add(function(){
                    //this.tint = 0xff0000; // red
                    console.log('[!!!] Enemy have reached the bread');

                    status = FLY;
                    var duration = (Phaser.Point.distance(sprite.position, zero) / speed) * 200;
                    this.currtween = g.add.tween(sprite.position).to({x: zero.x, y: zero.y}, duration, null, true);
                    this.currtween.onComplete.add(flyAway,this);

                },this);
            };
            var setPos = function(a){
                sprite.x = a.x;
                sprite.y = a.y;
            };




            // Создание нового объекта - спрайта
            var sprite = g.add.sprite(farPoint.x,farPoint.y, 'ebird');

            // Центровка
            sprite.anchor.setTo(0.5);
            sprite.basescale = 0.5;
            sprite.scale.setTo(sprite.basescale);
            sprite.inst = this;

            // Запуск анимации вперевалочку
            sprite.angle = -10;
            waddleright();


            g.physics.arcade.enable(sprite);
        };

        this.getBodies = function(){

            if(set.length === container.length)
                return set;

            set = [];
            container.forEach(function(item){
                set.push(item.getSprite());
            });
            console.log('New set : '+set);

            return set;
        }
    };

    var Bread = function(){

        var sprite = g.add.sprite(zero.x,zero.y, 'bread');

        this.restore = function(){
            sprite.frame = 0;
        };

        this.setFrame = function(v){
            sprite.frame = v;
        };

        sprite.anchor.setTo(0.5);
        sprite.scale.setTo(0.8);
    };

    var Bird = function(){
        var sprite = g.add.sprite(zero.x, zero.y-64, 'bird');
        sprite.anchor.setTo(0.5);
        sprite.basescale = 0.5;
        sprite.scale.setTo(sprite.basescale);

        g.physics.arcade.enable(sprite);

        this.jumpTo = function(wayId){
            sprite.scale.x = (2*(wayId===1 || wayId===3) -1)*sprite.basescale;
            console.log('moveTo id :',wayId);
            moveTo(endPoint[wayId]);
        };

        // Перемещение птицы с анимациями в позицию [tox,toy]
        var moveTo = function (pos) {
            // Съеживание до 0.6
            g.add.tween(sprite.scale).to({y: sprite.basescale*0.6}, 100, null, true).onComplete.add(function () {
                //console.log('CompletedA');
                // Проскальзывание в нужные координаты
                console.log('moveTo',pos);
                g.add.tween(sprite.position).to({x: pos.x, y: pos.y}, 50, null, true).onComplete.add(function () {
                    //console.log('CompletedB');
                    // Разжатие в нормальные размеры
                    g.add.tween(sprite.scale).to({y: sprite.basescale}, 100, null, true);

                }, this);
            }, this);
        };

        this.getBody = function(){
            return sprite;
        };

    };

    this.enemies = new EnemyGroup();

    this.bread = new Bread();

    this.bird = new Bird();

    g.physics.arcade.enable(this.bird);

}