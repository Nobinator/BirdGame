

/*
*   Загрузка ассетов и установка окружения
*/
var zero,farPoint,flyPoint,startPoint,endPoint;

function loadAssets(){

        g.load.image('bird', 'assets/bird.png');
        g.load.image('ebird', 'assets/ebird.png');
        g.load.image('bread', 'assets/bread.png');
        g.load.image('back', 'assets/back.png');
        g.create.texture('button', ['7'], 80, 80);

        // Координата хлебушка
        zero = {x : g.world.centerX, y : g.world.centerY+64};
        // Координата достаточно далекая, чтобы туда прятать спрайты
        farPoint = {x : -100, y : -100};
        // Координата, куда улетают схватившие хлебушек птицы
        flyPoint = {x : g.world.width*(4/5), y : -100};

        /* Координаты wayPoint'ов даны в следующей последовательности
         * [0][1]   TOP_LEFT        TOP_RIGHT
         * [2][3]   BOTTOM_LEFT     BOTTOM_RIGHT */


        // Отступ ЛЕВО/ПРАВО для стартовых точек
        const A = -64;
        // Отступ ВЕРХ/НИЗ для стартовых точек
        const B = g.world.centerY/1.4;

        startPoint = [
            {x : A, y : B},
            {x : g.world.width-A, y : B},
            {x : A, y : g.world.height-B},
            {x : g.world.width-A, y : g.world.height-B}];

        // Отступ ЛЕВО/ПРАВО для конечных точек (от центра)
        const C = 96;
        // Отступ ВЕРХ/НИЗ для стартовых точек (от центра)
        const D = 64;

        endPoint = [
            {x : zero.x-C, y : zero.y-D},
            {x : zero.x+C, y : zero.y-D},
            {x : zero.x-C, y : zero.y+D},
            {x : zero.x+C, y : zero.y+D}];


    }

function setupEnviroment(){
    // Фон
    g.stage.backgroundColor = '#626973';
    // Задний план
    g.add.sprite(0,0, 'back');

    //g.state.start('LoadObjects');
}