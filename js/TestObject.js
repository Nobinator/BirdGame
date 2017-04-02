/**
 * Created by Nobinator on 02.04.2017.
 */


function TestObject(){

    //private
    var killAllJews = function(){
        console.log('No');
    };
    // public
    this.killAllJews = function(){
        console.log('Ok');
    };
    // private call
    killAllJews();


}