/**
 * Created by Nobinator on 03.04.2017.
 */


function TestObject(){

    this.foo = function(){
        // smth
        //console.log('foo');
    };

    var self = this;

    var bar = function(){
        //console.log(self.foo());
        //this.foo();
        //TestObject.foo();
    };

    bar();

}