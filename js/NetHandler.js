

function NetHandler() {
    const RQ_GETME =        "/telegram/getMe";
    const RQ_SENDSCORE =    "/telegram/setScore";
    const RQ_GETHS =        "/telegram/getGameHighScores";
    const RQ_SENDMSG =      "/telegram/sendMessage";
    const EMPTY_DATA = "Игра запущена вне telegram или некорректный хеш";


    var user_id;
    var inline_message;

    /*var post = function(url, data, cb, failCb) {

        console.log("Отправка запроса : ",url," с параметрами : "+JSON.stringify(data));

        var xhr = new XMLHttpRequest();
        var body = [];
        for (var i in data) {
            body.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
        }
        console.log(JSON.stringify(body));
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

    var get = function(url, data, cb, failCb) {

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
        xhr.open("GET", url, true);
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

    this.sendmsg = function(){
        post(RQ_SENDMSG,{ chat_id : 122921921, text : "Hello"}, function (rs) {
            console.log("Ответ на ",RQ_SENDMSG," : ",rs);
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

        get(RQ_GETHS, { user_id: user_id, inline_message_id : inline_message }, function (rs) {

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
    */

    /*var post = function(url,data, succ, done,fail,always){
        var jqxhr = $.post(url, data, succ)
            .done(done(ddata))
            .fail(fail())
            .always(always());
    };

    this.sendMsg = function(){
        post(
            RQ_SENDMSG,
            {chat_id : 122921921, text : "Hello"},
            function(){console.log("succ")},
            function(data){console.log("done Data loaded : "+JSON.stringify(data))},
            function(){console.log("fail")},
            function(){console.log("always")}
        );
    };*/

    /*this.req = function(){
        $.ajax({
            type: "POST",
            url: RQ_GETME,
            data: "",
            success: function(response, status, xhr){
                var ct = xhr.getResponseHeader("content-type") || "";
                if (ct.indexOf('html') > -1) {
                    //do something
                }
                if (ct.indexOf('json') > -1) {
                    // handle json here
                    console.log(JSON.stringify(ct.indexOf('json')));
                }
            }
        });
    };*/

    this.req = function(){

        console.log("POST");

        $.post(
            RQ_SENDMSG,
            {
                chat_id: 122921921,
                text: "Hello"
            },
            onAjaxSuccess
        );

        function onAjaxSuccess(data)
        {
            // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
            alert(data);
            alert(JSON.stringify(data));
        }
    };

    this.sendScore = function(sc){};

    this.getHighScores = function(){};


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


    //readParameters();

}
