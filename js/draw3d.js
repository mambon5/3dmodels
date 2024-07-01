const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function main() {    
    // resizeCanvas();
    dibuixaFigures(); 
          
}

function dibuixaFigures() {
    // Start a new Path
    ctx.beginPath();
    rectangle(10,10,100,100)
    rectangle(60,80,10,10)
    rectangles(20, 25, 25, 15, 15, 30)

    // Draw the Path
    ctx.stroke();
}

function  rectangle(x,y, alt, ample) {
    ctx.moveTo(x, y);
    ctx.lineTo(x+ample, y);
    ctx.lineTo(x+ample,y+ alt);
    ctx.lineTo(x, y+alt);
    ctx.lineTo(x, y);
}

function rectangles(num, x0, y0, alt, ample, dist) {
    for(let i=0; i< num; i++) {
        rectangle(x0 + i*dist,y0, alt, ample)
    }
}

// definint variables
ample = 100;
alt = 100;
profund = 100;

// executa main()

main();






