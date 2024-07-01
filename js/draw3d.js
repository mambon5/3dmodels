const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function main() {    
    // resizeCanvas();
    // dibuixaFigures(); 
    var a = document.getElementById("angle_x").value
    var b = document.getElementById("angle_y").value
    var c = document.getElementById("angle_z").value
    a = parseInt(a)
    b = parseInt(b)
    c = parseInt(c)
    ctx.clearRect(0,0,800,800)
    dibuixa(a,b,c);
          
}


function dibu_poliedre(punts) {// dibuixem en 2d un poliedre (només usem les 2 primeres coords)
    ctx.moveTo(punts[0][0], punts[0][1]);
    for(let i=1; i< punts.length; i++) {        
        ctx.lineTo(punts[i][0], punts[i][1]);
    }
    ctx.lineTo(punts[0][0], punts[0][1]);
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
            proj[i] = rotate_vec(a,b,c,rectangle[j][i])
        }
        // dbuixant la cara rotada
        dibu_poliedre(proj)
    }
}

function dibuixa(a,b,c) {
    x = 200; y =200; z = 10 // punt inicial en 3D
    //a,b,c angles de rotació

    rectanble1 = rectangle3d(x,y,z,ample,alt,profund);
    rectanble2 = rectangle3d(x+200,y,z,ample*2,20,20);
    
    // start a new path
    ctx.beginPath();

   
    dibuix_rectangle(rectanble1,a,b,c)
    dibuix_rectangle(rectanble2,a,b,c)

    
    
    
    ctx.strokeStyle = 'black';
    
    // Draw the Path
    ctx.stroke();

}

// executa main()

main();






