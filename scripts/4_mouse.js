window.onload = function() {
    var body = document.getElementsByTagName("canvas")[0],
        delta = 300,
        click = false,
        oldX = 0,
        oldY = 0;
    body.ondblclick = function () {
        click = !click;
    }
    body.onmousemove = function(event){
        //if not active
        if(!click)
            return;
        setTimeout(function(){
        var x = event.clientX,
        y = event.clientY;},100
        );
        /*camera.rotation.x = x;
        camera.rotation.y = y;*/
        var nx = x - camera.position.x,
            ny = y - camera.position.y;
        var coor = "X coords: " + nx + ", Y coords: " + ny;

        console.log(coor);
    }
}