var bread,bird,enemies;

function instantiateGameObjects(){

        function makeBird(a, b){
            var br = g.add.sprite(a,b, 'bird');
            br.anchor.setTo(0.5);

            br.basescale = 0.5;
            br.scale.setTo(br.basescale);

            br.jumpTo = function(wayId){
                this.scale.x = (2*(wayId===1 || wayId===3) -1)*this.basescale;
                this.moveTo(endPoint[wayId]);
            };

            // Перемещение птицы с анимациями в позицию [tox,toy]
            br.moveTo = function (pos) {
                // Съеживание до 0.6
                g.add.tween(this.scale).to({y: this.basescale*0.6}, 100, null, true).onComplete.add(function () {
                    //console.log('CompletedA');
                    // Проскальзывание в нужные координаты
                    g.add.tween(this).to({x: pos.x, y: pos.y}, 50, null, true).onComplete.add(function () {
                        //console.log('CompletedB');
                        // Разжатие в нормальные размеры
                        g.add.tween(this.scale).to({y: this.basescale}, 100, null, true);

                    }, this);
                }, this);
            };

            return br;
        }

        function makeEnemy(group){

            // Создание нового объекта - спрайта
            var e = group.create(farPoint.x,farPoint.y, 'ebird');
            // Центровка
            e.anchor.setTo(0.5);

            e.basescale = 0.5;
            e.scale.setTo(e.basescale);

            e.speed = 128;// px per sec
            // Реализация шагов вперевалочку
            e.waddleright = function(){
                var r = g.add.tween(this).to({angle: '+20'}, 500, null, true);r.onComplete.add(function () {this.waddleleft();},this);
                r.start();
            };
            e.waddleleft = function(){
                var l = g.add.tween(this).to({angle: '-20'}, 500, null, true);l.onComplete.add(function () {this.waddleright();},this);
                l.start();
            };
            // Запуск анимации вперевалочку
            e.angle = -10;
            e.waddleright();
            // Реализация плавного перемещение в точку
            e.moveToEnd = function(pos){
                var duration = (Phaser.Point.distance(this, pos) / this.speed) * 1000;
                this.currtween = g.add.tween(this).to({x: pos.x, y: pos.y}, duration, null, true);
                this.currtween.onComplete.add(function(){
                    //this.tint = 0xff0000; // red
                    console.log('[!!!] Enemy have reached the bread');

                    e.status = 'fly';
                    var duration = (Phaser.Point.distance(this, zero) / this.speed) * 200;
                    this.currtween = g.add.tween(this).to({x: zero.x, y: zero.y}, duration, null, true);
                    this.currtween.onComplete.add(function(){
                        this.flyAway();
                    },this);

                },this);
            };

            e.flyAway = function(){
                decreaseBread();
                var duration = (Phaser.Point.distance(this, flyPoint) / this.speed) * 100;
                this.currtween = g.add.tween(this).to({x: flyPoint.x, y: flyPoint.y}, duration, null, true);
                this.currtween.onComplete.add(function(){
                    e.pop();
                },this);
            };

            // Спавн инициирует перемещение объекта в начальную точку и запуск следования в конечную точку
            e.push = function(wayId){

                //(wayId===1 || wayId===3)
                //
                // 1 =  1
                // 0 = -1
                // 2*x -1
                this.scale.x = (2*(wayId===0 || wayId===2) -1)*this.basescale;
                e.setPos(startPoint[wayId]);
                this.moveToEnd(endPoint[wayId]);
                //this.tint = 0xffbf00; // orange
                e.isActive = true;
                e.status = 'active';
                e.wayId = wayId;
            };

            e.setPos = function(a){
                e.x = a.x;
                e.y = a.y;
            };

            e.pop = function(){
                if(e.isActive) {

                    e.body.velocity.setTo(0);
                    e.body.acceleration.setTo(0);
                    e.setPos(farPoint);
                    e.currtween.stop();
                    //this.tint = 0x000000; // black
                    e.isActive = false;
                    e.status = 'free';
                    e.wayId = -1;
                }
            };

            e.kick = function(){
                if(e.status !== 'fly')
                    if(e.status !== 'kicked') {
                        e.status = 'kicked';
                        e.currtween.stop();
                        e.body.velocity.y = g.rnd.integerInRange(-600, -1200);



                        if(e.wayId === 0 || e.wayId === 2) {
                            e.body.velocity.x = g.rnd.integerInRange(-500, -10);
                        }else{
                            e.body.velocity.x = g.rnd.integerInRange(10, 500);
                        }
                        e.body.acceleration.y = 3000;
                        console.log('Kicked!');
                    }


            };

            e.isActive = false;

            g.physics.arcade.enable(e);
        }

        function enemyGroup(){
            var gp = g.add.group();

            gp.new = function(count){
                // Забиваем массив враждебными птицами
                for (var i = 0; i < count; i++){
                    makeEnemy(gp);
                }
            };

            gp.push = function(){

                var pushIt = function(item){
                    var way = g.rnd.integerInRange(0, 3);
                    item.push(way);
                    //console.log('[ @ ] Enemy on the way : ',way);
                };

                var getInActive = function(){
                    for (var i = 0; i < gp.children.length; i++) {
                        var n = gp.getAt(i);
                        if(!n.isActive){
                            return n;
                        }
                    }
                    console.log('[ + ] +1 to enemies list. Len : ',gp.children.length);
                    gp.new(1);

                    //console.log('[ V ] New ',g.children.length);
                    return gp.getAt(gp.children.length-1);
                };

                var act = getInActive();
                if(act !== -1 ) {
                    //console.log('Spawned Item ', e);
                    pushIt(act);
                }
            };

            gp.popAll = function(){
                for (var i = 0; i < gp.children.length; i++) {
                    var n = gp.getAt(i);
                    n.pop();
                }
            };

            return gp;
        }

        // Активируем физику!
        g.physics.startSystem(Phaser.Physics.ARCADE);

        // Хлебушек
        bread = g.add.sprite(zero.x,zero.y, 'bread');
        bread.anchor.setTo(0.5);
        bread.scale.setTo(0.8);

        // Главный герой
        // Создаем главного персонажа - птицу
        bird = makeBird(zero.x, zero.y-64);
        g.physics.arcade.enable(bird);

        enemyGroup();

        // Создаем группу для враждебных птиц (Группа лучше чем массив, потому что с группой обжно обрабатывать коллизию легко)
        enemies = enemyGroup();
        enemies.new(1);
}
