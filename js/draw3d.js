const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.scale(1, -1)
ctx.translate(canvas.width/2,-canvas.height/2)
ctx.lineWidth = 2;
canvas_zoom = 3
userZoom = 1

function main() {    
    // resizeCanvas();
    // dibuixaFigures(); 
    
     

    var alpha = document.getElementById("angle_x").value
    var beta = document.getElementById("angle_y").value
    var gamma = document.getElementById("angle_z").value
    userZoom = document.getElementById("user_zoom").value
    alpha = parseInt(alpha)
    beta = parseInt(beta)
    gamma = parseInt(gamma)
    userZoom = parseInt(userZoom)
    // controlant que l'usuari no es flipi amb el zoom
    if(userZoom<1) {
        userZoom = 1
        document.getElementById("user_zoom").value = 1
    }
    if(userZoom>10) {
        userZoom = 10
        document.getElementById("user_zoom").value = 10
    }

    ctx.clearRect(-400,-400,1200, 1200)
    dibuixa(alpha,beta,gamma);
          
}


function dibu_poliedre(punts) {// dibuixem en 2d un poliedre (només usem les 2 primeres coords)
    ctx.moveTo(punts[0][0]*canvas_zoom*userZoom, punts[0][1]*canvas_zoom*userZoom);
    for(let i=1; i< punts.length; i++) {        
        ctx.lineTo(punts[i][0]*canvas_zoom*userZoom, punts[i][1]*canvas_zoom*userZoom);
    }
    ctx.lineTo(punts[0][0]*canvas_zoom*userZoom, punts[0][1]*canvas_zoom*userZoom);
}



// definint variables
ample = 100;
alt = 100;
profund = 100;

function rectangle3d(x,y,z,ample,alt,profund,color="black") {
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
    
    
    return [poliedre, color]
}

function dibuix_rectangle(rectangle, a,b,c) {
    let poliedre = rectangle[0]
    // preparant el camí
    ctx.beginPath();
     // rotant rectangle
     for(let j=0;j<poliedre.length;j++) {
        // pillant una cara
        var proj = poliedre[j]
        for(var i=0; i< poliedre[j].length; i++) {
            // pillant cada vector de la cara
            proj[i] = rotate_vec(a,b,c,poliedre[j][i])
        }
        // dbuixant la cara rotada
        dibu_poliedre(proj)
        ctx.strokeStyle = rectangle[1];
    
        // Draw the Path
        ctx.stroke();
        
    }
}

function model_viscaSofa(x,y,z) {
    // x, y, z, ample, alt, profund
    //travesanys profund terra    
    recttravpf1 = rectangle3d(x,y,z,4,4,50);
    recttravpf2 = rectangle3d(x+50,y,z,4,4,50);
    recttravpf3 = rectangle3d(x+50+50,y,z,4,4,50);
    recttravpf4 = rectangle3d(x+50+50+4+2,y,z,4,4,50);
    recttravpf5 = rectangle3d(x+50+50+50+4+2,y,z,4,4,50);
    recttravpf6 = rectangle3d(x+204+2,y,z,4,4,50);
    
    

    // pal amun petit frontal
    let alt_y=44
    rect7 = rectangle3d(x,y,z+50,4,alt_y,4);
    rect8 = rectangle3d(x+50,y,z+50,4,alt_y,4);
    rect8v1 = rectangle3d(x+100,y,z+50,4,alt_y,4);
    rect8v2 = rectangle3d(x+104+2,y,z+50,4,alt_y,4);
    rect8v3 = rectangle3d(x+154+2,y,z+50,4,alt_y,4);
    rect8v4 = rectangle3d(x+204+2,y,z+50,4,alt_y,4);

    // pal amun petit darrere
    rectampet1 = rectangle3d(x,y,z-4+10,4,alt_y,4);
    rectampet2 = rectangle3d(x+50,y,z-4+10,4,alt_y,4);
    rectampet3 = rectangle3d(x+100,y,z-4+10,4,alt_y,4);
    rectampet4 = rectangle3d(x+104+2,y,z-4+10,4,alt_y,4);
    rectampet5 = rectangle3d(x+154+2,y,z-4+10,4,alt_y,4);
    rectampet6 = rectangle3d(x+204+2,y,z-4+10,4,alt_y,4);

    //travesanys llargs 
    // rect5 = rectangle3d(x,y,z+50,124,4,4);
    rectravll1 = rectangle3d(x,y+alt_y,z+50,104,4,4);
    rectravll2 = rectangle3d(x+104+2,y+alt_y,z+50,104,4,4);
    rectravll3 = rectangle3d(x,y+alt_y,z-4+10,104,4,4);
    rectravll4 = rectangle3d(x+104+2,y+alt_y,z-4+10,104,4,4);

    // pal amunt llarg darrere
    rectAll1 = rectangle3d(x,y,z-4,4,90,4);
    rectAll2 = rectangle3d(x+50,y,z-4,4,90,4, "red");
    rectAll3 = rectangle3d(x+100,y,z-4,4,90,4);
    rectAll4 = rectangle3d(x+104+2,y,z-4,4,90,4);
    rectAll5 = rectangle3d(x+154+2,y,z-4,4,90,4);
    rectAll6 = rectangle3d(x+204+2,y,z-4,4,90,4);
    
    
    // pals inclinats llargs respaldo
    //respado vs asiento debe manteren 110-120 grados de inclinacion, means 60 wrt vertical
    let ang_x = -6
    let rectIll1 = [rotate_rectangle_from_point(
        rectangle3d(x+4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+0+4,y,z-4+10])]
    let rectIll2 = [rotate_rectangle_from_point(
        rectangle3d(x+50-4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+50-4,y,z-4+10])]
    let rectIll3 = [rotate_rectangle_from_point(
        rectangle3d(x+100-4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+100-4,y,z-4+10])]
    let rectIll4 = [rotate_rectangle_from_point(
        rectangle3d(x+104+2+4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+104+2+4,y,z-4+10])]
    let rectIll5 = [rotate_rectangle_from_point(
        rectangle3d(x+154+2-4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+154+2-4,y,z-4+10])]
    let rectIll6 = [rotate_rectangle_from_point(
        rectangle3d(x+204+2-4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+204+2-4,y,z-4+10])]
    
    var model3d = [recttravpf1, recttravpf2, recttravpf3, recttravpf4,
        recttravpf5, recttravpf6,rectravll1, rectravll2,rectravll3, rectravll4,rect7,rect8,rect8v1,
        rect8v2,rect8v3, rect8v4,rectAll1, rectAll2, rectAll3, rectAll4, rectAll5, rectAll6,
         rectIll1, 
        rectIll2, rectIll3, rectIll4, rectIll5, rectIll6,
        rectampet1, rectampet2, rectampet3, rectampet4, rectampet5, rectampet6]
    return model3d
}

function dibuixa(a,b,c) {
    x =-90; y =-10; z = -10 // punt inicial en 3D
    //a,b,c angles de rotació

    model3d = model_viscaSofa(x, y, z)  
    

    for(var i=0;i<model3d.length;i++) {
        dibuix_rectangle(model3d[i],a,b,c)
    }
    

    
    
    
    
    

}

// executa main()

main();






