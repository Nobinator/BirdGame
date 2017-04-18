

function NetHandler() {
    const RQ_GETME = "/telegram/getMe";
    const RQ_SENDSCORE = "/telegram/setScore";
    const RQ_GETHS = "/telegram/getGameHighScores";
    const EMPTY_DATA = "Игра запущена вне telegram или некорректный хеш";

    var user_id;
    var inline_message;

    var post = function(url, data, cb, failCb) {

        console.log("Отправка запроса : ",url," с параметрами : "+JSON.stringify(data));

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
                failCb(xhr.readyState,xhr.status);
            } else {
                universalFailCallback(url,xhr.readyState,xhr.status);
            }
        };
        xhr.open("POST", url, true);
        xhr.send(body.join('&'));
    };

    var universalFailCallback = function(url,rdy,sts){
        console.error("FailCallback для : ",url," readyState : ",rdy," status : "+sts);
    };

    this.poper = function(){
        post(RQ_GETME,{}, function (rs) {
            console.log("Ответ на ",RQ_GETME," : ",rs);
        });
    };

    this.sendScore = function(sc) {
        if (isDataEmpty()) {
            return;
        }

        post(RQ_SENDSCORE, {
            user_id: user_id,
            score: sc || 0,
            inline_message_id : inline_message
        }, function (rs) {
            console.log("Ответ на ",RQ_SENDSCORE," : ",rs);
        })
    };

    this.getHighScores = function() {
        if (isDataEmpty()){
            console.log(EMPTY_DATA);
            return;
        }

        post(RQ_GETHS, { user_id: user_id, inline_message_id : inline_message }, function (rs) {

            console.log("Ответ на ",RQ_GETHS," : ",rs);

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
        });
    };

    var readParameters = function() {

        var getHashParams = function() {

            var hashParams = {};
            var e,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([^&;=]+)=?([^&;]*)/g,
                d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
                q = window.location.hash.substring(1);

            while (e = r.exec(q))
                hashParams[d(e[1])] = d(e[2]);

            return hashParams;
        };

        var data = getHashParams().player_info;
        data = atob(data);
        data= JSON.parse(data);

        user_id = data["u"];
        inline_message = data["i"];

        console.info("user_id : ",user_id);
        console.info("inline_message_id : ",inline_message);
    };

    var isDataEmpty = function(){
        if (!user_id || !inline_message ){
            console.log(EMPTY_DATA);
            return true;
        }
        return false;
    };


    readParameters();

}
