

function NetHandler() {


    const requestA = "/telegram/getMe";
    const requestB = "/telegram/setScore";
    const requestC = "/telegram/getHighScores";


    var curData;

    this.poper = function(){
        console.log("Отправка запроса : ",requestA);
        post(requestA,{}, function (data) {
            console.log("Ответ на ",requestA," : ",data);
        }, function(rdy,sts){
            console.error("FailCallback для : ",requestA," readyState : ",rdy," status : "+sts);
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
                failCb(xhr.readyState,xhr.status)
            }
        };
        xhr.open("POST", url, true);
        xhr.send(body.join('&'));
    };

    this.sendScore = function(sc) {
        console.log("Отправка запроса : ",requestB, "data : ",curData," score : "+sc);
        if (!curData) {
            console.error("Игра запущена вне telegram или некорректный хеш");
            return;
        }
        post(requestB, {
            data: curData,
            score: sc || 0
        }, function (result) {
            console.log("Ответ на ",requestB," : ",result);
            console.log(result.scores);
            if (result.new) {
                //ge('score_share').className = 'score_share shown';
            }
        }, function (rdy,sts) {
            console.error("FailCallback для : ",requestA," readyState : ",rdy," status : "+sts);
        })
    };

    this.getHighScores = function() {
        console.log("Отправка запроса : ",requestC);
        if (!curData){
            console.log("Игра запущена вне telegram или некорректный хеш");
            return;
        }

        post(requestC, {data: curData}, function (rs) {

            console.log("Ответ на ",requestA," : ",rs);

            if (rs['ok'] === true) {

                var text = '';

                var list = rs['result'];
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
        }, function(rdy,sts){
            console.error("FailCallback для : ",requestC," readyState : ",rdy," status : "+sts);
        });
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
