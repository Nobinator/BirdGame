

function NetHandler() {
    const RQ_GETME =        "/telegram/getMe";
    const RQ_SENDSCORE =    "/telegram/setScore";
    const RQ_GETHS =        "/telegram/getGameHighScores";
    const RQ_SENDMSG =      "/telegram/sendMessage";
    const EMPTY_DATA = "Игра запущена вне telegram или некорректный хеш";

    var isTelegramable = false;


    var user_id;
    var inline_message;

    var req = function(url,data,callback){

        console.log("Запрос : ",url, "с параметрами : ",JSON.stringify(data));

        $.get(
            url,
            data,
            ajaxCb
        );

        function ajaxCb(data){
            console.log("Ответ на ",url, " : ",JSON.stringify(data));
            callback(data);
        }
    };

    this.sendScore = function(sc){

        req(RQ_SENDSCORE, { user_id : user_id, score : sc || 0, inline_message_id : inline_message }, function(){

        });

    };

    this.getHighScores = function(){

        req(RQ_GETHS, { user_id : user_id, inline_message_id : inline_message }, function(){

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

        isTelegramable = data;

        if(!isTelegramable) {
            console.log(EMPTY_DATA);
            return;
        }

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
