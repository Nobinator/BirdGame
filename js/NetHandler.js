

function NetHandler() {

    var curData;

    this.poper = function(){
        post('/telegram/getMe', function (data) {
            console.log(data);
        });
    };

    var post = function(url, data, cb, failCb) {
        var xhr = new XMLHttpRequest();
        var body = [];
        for (var i in data) {
            body.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
        }
        xhr.onreadystatechange = function () {
            //noinspection EqualityComparisonWithCoercionJS
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resp = xhr.responseText;
                cb(JSON.parse(resp))
            } else if (failCb) {
                failCb()
            }
        };
        xhr.open("POST", url, true);
        xhr.send(body.join('&'));
    };

    this.sendScore = function(sc) {
        console.log("Попытка отправить результат");
        if (!curData) {
            console.log("Игра запущена вне telegram или некорректный хеш");
            return;
        }
        post('/telegram/setScore', {
            data: curData,
            score: sc || 0
        }, function (result) {
            console.log("Результат отправлен. Ответ : ",result);
            console.log(result.scores);
            if (result.new) {
                //ge('score_share').className = 'score_share shown';
            }
        }, function () {
            console.log("Результат не отправлен : Запрос ушел с ошибкой или сервер не отвечает");
            //ge('updating').style.display = 'none';
        })
    };

    this.getHighScores = function() {
        console.log("Попытка получить список результатов");
        if (!curData){
            console.log("Игра запущена вне telegram или некорректный хеш");
            return;
        }

        post('/telegram/getHighScores', {data: curData}, function (rs) {

            console.log("Ответ за запрос по спису результатов : ",rs);

            var o = JSON.parse(rs);
            if (o['ok'] === true) {

                var text = '';

                var list = o['result'];
                list.forEach(function (item) {
                    //console.log(item.user.username,item.score);
                    text.concat([
                        ('0000' + item.score).slice(-4),
                        ' : ',
                        item.user.username,
                        '\n'
                    ]);
                });

                ui.setLeadList(text);
            }
            //console.log(result.scores);
        }, function () {
            console.log("Списки результатов не получены : Запрос ушел с ошибкой или сервер не отвечает");
        })
    };

    var readParameters = function() {

        //var player_info = g.net.getQueryString()['player_info'];


        //abc.xyz/gdc/#eyJ1IjoxMjI
        // Получение текста после #
        curData = (location.hash || '').substr(1);
        curData = curData.replace("/[\?&].*/g, ''");

        console.log('curData', curData);

        // curData будет содержать всё необходимое для отправки запросов в telegram,
        // а она сама получается тоже из телеграма путем махинаций на сервере Ростика.
        // Не знаю что там творится, главное работает.

    };

    readParameters();

}
