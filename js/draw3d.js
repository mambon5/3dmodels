const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.scale(1, -1)
ctx.translate(0,-canvas.height/2)
ctx.lineWidth = 2;
canvas_zoom = 4

function main() {    
    // resizeCanvas();
    // dibuixaFigures(); 
    
     

    var a = document.getElementById("angle_x").value
    var b = document.getElementById("angle_y").value
    var c = document.getElementById("angle_z").value
    a = parseInt(a)
    b = parseInt(b)
    c = parseInt(c)
    ctx.clearRect(0,-400,800, 1200)
    dibuixa(a,b,c);
          
}


function dibu_poliedre(punts) {// dibuixem en 2d un poliedre (només usem les 2 primeres coords)
    ctx.moveTo(punts[0][0]*canvas_zoom, punts[0][1]*canvas_zoom);
    for(let i=1; i< punts.length; i++) {        
        ctx.lineTo(punts[i][0]*canvas_zoom, punts[i][1]*canvas_zoom);
    }
    ctx.lineTo(punts[0][0]*canvas_zoom, punts[0][1]*canvas_zoom);
}



// definint variables
ample = 100;
alt = 100;
profund = 100;

function rectangle3d(x,y,z,ample,alt,profund) {
    // construint les 6 cares del cub en 3d
    var cara1 = [[x,y,z], [x+ample, y, z], [x+ample, y+alt, z], [x, y+alt, z]]
    var cara2 = [[x,y,z+profund], [x+ample, y, z+profund], [x+ample, y+alt, z+profund], 
                [x, y+alt, z+profund]]
    var cara3 = [[x,y,z], [x+ample, y, z], [x+ample, y, z+profund], [x, y, z+profund]]
    var cara4 = [[x,y+alt,z], [x+ample, y+alt, z], [x+ample, y+alt, z+profund], 
                [x, y+alt, z+profund]]
    var cara5 = [[x,y,z], [x, y, z+profund], [x, y+alt, z+profund], [x, y+alt, z]]
    var cara6 = [[x+ample,y,z], [x+ample, y, z+profund], [x+ample, y+alt, z+profund], 
                [x+ample, y+alt, z]]

    // vector de cares
    poliedre = [cara1, cara2, cara3, cara4, cara5, cara6]
    
    
    return poliedre
}

function dibuix_rectangle(rectangle, a,b,c) {
     // rotant rectangle
     for(let j=0;j<rectangle.length;j++) {
        // pillant una cara
        var proj = rectangle[j]
        for(var i=0; i< rectangle[j].length; i++) {
            // pillant cada vector de la cara
            proj[i] = rotate_vec(a,b,c,rectangle[j][i])
        }
        // dbuixant la cara rotada
        dibu_poliedre(proj)
    }
}

function dibuixa(a,b,c) {
    x =50; y =50; z = 10 // punt inicial en 3D
    //a,b,c angles de rotació

    rect1 = rectangle3d(x,y,z,4,4,50);
    rect2 = rectangle3d(x+40,y,z,4,4,50);
    rect3 = rectangle3d(x+40+40,y,z,4,4,50);
    rect4 = rectangle3d(x+40+40+40,y,z,4,4,50);
    
    
    rect5 = rectangle3d(x,y,z+50,124,4,4);
    rect6 = rectangle3d(x,y+20,z+50,124,4,4);

    rect7 = rectangle3d(x,y,z+50,4,20,4);
    rect8 = rectangle3d(x+40,y,z+50,4,20,4);
    rect9 = rectangle3d(x,y,z,4,20,4);
    rect10 = rectangle3d(x+40,y,z,4,20,4);
    rect11 = rotate_rectangle_from_point(rect10,3,0,0,[x+40,y,z])
    
    var model3d = [rect1, rect2, rect3, rect4,rect5,rect6,rect7,rect8,rect9,rect10,rect11]
    // start a new path
    ctx.beginPath();

    for(var i=0;i<model3d.length;i++) {
        dibuix_rectangle(model3d[i],a,b,c)
    }
    

    
    
    
    ctx.strokeStyle = 'black';
    
    // Draw the Path
    ctx.stroke();
    

}

// executa main()

main();






