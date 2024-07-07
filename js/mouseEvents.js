newMousePos = [0,0]
lastIncPos = [0,0]
fentZoom=false

function pillaPos(event) {
    fentZoom = true
    let x = event.clientX;
    let y = event.clientY;
    newMousePos = [x, y]
    var elem = document.body; //body or what element you want.
    // dont trigger the default (scroll) behavior when the event is originating from that element
    elem.setAttribute("style","touch-action: none;");   
}

function lliberaPos() {
    fentZoom = false
    dy = parseInt(document.getElementById("angle_x").value)
    dx = parseInt(document.getElementById("angle_y").value)
    lastIncPos = [dy, dx]
}

function actualitzaPos(event) {
    if(fentZoom) {
        let x = event.clientX;
        let y = event.clientY;
        dx = x - newMousePos[0]
        dy = y - newMousePos[1]
        document.getElementById("angle_x").value = dy + lastIncPos[0]
        document.getElementById("angle_y").value = dx + lastIncPos[1]
        main()
    }
    
}