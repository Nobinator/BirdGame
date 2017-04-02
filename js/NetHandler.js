var curData;
/*

Вызывая post вызывается http://localhost/api/getHighScores что ведет за собой
POST http://localhost/api/getHighScores 404 (Not Found)
т.е в сурсах телеграма они даже не засвечитвают бот токен, а отправляют на внутренний сервер, с которого уже идет запрос на сервер телеграма


*/

function poper(){
    post('/telegram', function(data){
        console.log(data);
    });
}

function post(url, data, cb, failCb) {
    var xhr = new XMLHttpRequest();
    var body = [];
    for(var i in data) {
        body.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
    }
    xhr.onreadystatechange = function() {
        //noinspection EqualityComparisonWithCoercionJS
        if(xhr.readyState == 4 && xhr.status == 200) {
            var resp = xhr.responseText;
            cb(JSON.parse(resp))
        } else if (failCb) {
            failCb()
        }
    };
    xhr.open("POST", url, true);
    xhr.send(body.join('&'));
}



function sendScore(sc) {
    if (!curData) {
        //ge('updating').style.display = 'none';
        return;
    }
    console.log('/api/setScore');
    post('/setScore', {
        data: curData,
        score: sc || 0
    }, function(result) {
        console.log('/api/setScore SUCCESS ');
        console.log('setScore result',result);
        console.log(result.scores);
        if (result.new) {
            //ge('score_share').className = 'score_share shown';
        }
    }, function() {
        console.log('/api/setScore FAIL');
        //ge('updating').style.display = 'none';
    })
}

function getHighScores() {
    if (!curData) return;

    console.log('/api/getHighScores');

    post('/getHighScores', { data: curData}, function(result) {
        console.log('/api/getHighScores SUCCESS');
        console.log('getHighScores result',result);
        //console.log(result.scores);
    }, function(){
        console.log('/api/getHighScores FAIL');
    })
}

function readParameters(){

    //var player_info = g.net.getQueryString()['player_info'];


    //abc.xyz/gdc/#eyJ1IjoxMjI
    // Получение текста после #
    curData = (location.hash || '').substr(1);
    curData = curData.replace("/[\?&].*/g, ''");

    console.log('curData',curData);

    // curData будет содержать всё необходимое для отправки запросов в telegram,
    // а она сама получается тоже из телеграма путем махинаций на сервере Ростика.
    // Не знаю что там творится, главное работает.

}