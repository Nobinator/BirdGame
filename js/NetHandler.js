/**
 * Created by Nobinator on 01.04.2017.
 */

var user_id,message_id;

function readParameters(){

    // Получение параметра player_info
    var player_info = g.net.getQueryString()['player_info'];
    // Расшифровка base64
    player_info = atob(player_info);
    // Парсинг из Json
    player_info = JSON.parse(player_info);

    user_id = player_info['i'];
    message_id = player_info['u'];
    console.log(user_id,message_id);


}

function getGameHighScores(){

    // some request

    var ans =
        '{ "ok":true, "result":[ ' +
        '{ "position":1, "user":{ "id":122921921, "first_name":"Kirill", "last_name":"Evdokimov", "username":"Nobinator" }, "score":345 }, ' +
        '{ "position":2, "user":{ "id":3527572, "first_name":"Rostislav", "last_name":"Nikishin", "username":"Bronydell" }, "score":228 } ] }';


    var data = JSON.parse(ans);
    console.log(data);

    var text = '';

    data['result'].forEach(function(item) {
        text += item['position'] + '. ' + item['user']['username'] + ' - ' +item['score'] + '\n';
    });

    updLead(text);

}