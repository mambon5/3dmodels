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

function escriu_text(texts, a,b,c) {
    // text_3d has a [point, text] elements, "Point" is the point on the map, "text"
    // is the text itself
    ctx.save();
    ctx.scale(1,-1)
    ctx.textAlign = "center";
    ctx.fillStyle = "purple"
    
    for(var i=0; i< texts.length; i++) {
        // pillant cada text
        let text = texts[i]
        let vect = rotate_vec(a,b,c,text[0])  
        ctx.fillText(text[1],vect[0]*canvas_zoom*userZoom,-vect[1]*canvas_zoom*userZoom);
    }
    

    ctx.restore();
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
    let prof = 42
    let llargT = 100
    //travesanys profund terra    
    recttravpf1 = rectangle3d(x,y,z,4,4,prof);
    recttravpf2 = rectangle3d(x+llargT/2-4,y,z,4,4,prof);
    recttravpf3 = rectangle3d(x+llargT-4,y,z,4,4,prof);
    recttravpf4 = rectangle3d(x+llargT+2,y,z,4,4,prof);
    recttravpf5 = rectangle3d(x+llargT+50+2,y,z,4,4,prof);
    recttravpf6 = rectangle3d(x+llargT+100-2,y,z,4,4,prof);
    
    let alt_y=38
    //travesanys profund alts    
    recttravpfa1 = rectangle3d(x,alt_y-12,z+10,4,4,prof-10);
    recttravpfa2 = rectangle3d(x+llargT+100-2,alt_y-12,z+10,4,4,prof-10);
    

    // pal amun petit frontal
    
    rect7 = rectangle3d(x,y,z+prof,4,alt_y,4);
    rect8 = rectangle3d(x+llargT/2-4,y,z+prof,4,alt_y,4);
    rect8v1 = rectangle3d(x+llargT-4,y,z+prof,4,alt_y,4);
    rect8v2 = rectangle3d(x+llargT+2,y,z+prof,4,alt_y,4);
    rect8v3 = rectangle3d(x+llargT+50+2,y,z+prof,4,alt_y,4);
    rect8v4 = rectangle3d(x+llargT+100-2,y,z+prof,4,alt_y,4);

    // pal amun petit darrere
    rectampet1 = rectangle3d(x,y,z-4+10,4,alt_y-2,4);
    rectampet2 = rectangle3d(x+llargT/2-4,y,z-4+10,4,alt_y-2,4);
    rectampet3 = rectangle3d(x+llargT-4,y,z-4+10,4,alt_y-2,4);
    rectampet4 = rectangle3d(x+llargT+2,y,z-4+10,4,alt_y-2,4);
    rectampet5 = rectangle3d(x+llargT+50+2,y,z-4+10,4,alt_y-2,4);
    rectampet6 = rectangle3d(x+llargT+100-2,y,z-4+10,4,alt_y-2,4);

    //travesanys llargs 
    
    // rect5 = rectangle3d(x,y,z+50,124,4,4);
    rectravll1 = rectangle3d(x,y+alt_y,z+prof,llargT,4,4);
    rectravll2 = rectangle3d(x+llargT+2,y+alt_y,z+prof,llargT,4,4);
    rectravll3 = rectangle3d(x,y+alt_y-2,z-4+10,llargT,4,4);
    rectravll4 = rectangle3d(x+llargT+2,y+alt_y-2,z-4+10,llargT,4,4);

    // pal amunt llarg darrere
    rectAll1 = rectangle3d(x,y,z-4,4,90,4);
    rectAll2 = rectangle3d(x+llargT/2-4,y,z-4,4,90,4);
    rectAll3 = rectangle3d(x+llargT-4,y,z-4,4,90,4);
    rectAll4 = rectangle3d(x+llargT+2,y,z-4,4,90,4);
    rectAll5 = rectangle3d(x+llargT+50+2,y,z-4,4,90,4);
    rectAll6 = rectangle3d(x+llargT+100-2,y,z-4,4,90,4);
    
    
    // pals inclinats curts apoio pals frontals
    let ang_x = 40
    let long = 20
    let y_start = 2
    let z_start = prof-15
    let rectIap1 = [rotate_rectangle_from_point(
        rectangle3d(x,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x,y+y_start,z+z_start+4]), "blue"]
    let rectIap2 = [rotate_rectangle_from_point(
            rectangle3d(x+llargT/2-4,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT/2-4,y+y_start,z+z_start+4]), "blue"]
    let rectIap3 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT-4,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT-4,y+y_start,z+z_start+4]), "blue"]
    let rectIap4 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+2,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x,y+y_start,z+z_start+4]), "blue"]
    let rectIap5 = [rotate_rectangle_from_point(
            rectangle3d(x+llargT+52,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT/2-4,y+y_start,z+z_start+4]), "blue"]
    let rectIap6 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+100-2,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT+100-2,y+y_start,z+z_start+4]), "blue"]

    // pals inclinats llargs respaldo
    //respado vs asiento debe manteren 110-120 grados de inclinacion, means 60 wrt vertical
    ang_x = -6
    let rectIll1 = [rotate_rectangle_from_point(
        rectangle3d(x+4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+0+4,y,z-4+10])]
    let rectIll2 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT/2-4-4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+llargT/2-4-4,y,z-4+10])]
    let rectIll3 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT-4-4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+llargT-4-4,y,z-4+10])]
    let rectIll4 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+2+4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+llargT+2+4,y,z-4+10])]
    let rectIll5 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+50+2-4,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+llargT+50+2-4,y,z-4+10])]
    let rectIll6 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+100-6,y,z-4+10, 4, 90, 4)[0], ang_x,0,0,[x+llargT+100-6,y,z-4+10])]
    

    // reforç transversal y, evita moviment endir y
    let ang_z = 45
    long = 20
    y_start = alt_y-14
    z_start = prof
    let rectRefty1 = [rotate_rectangle_from_point(
        rectangle3d(x+4,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,ang_z,[x+4,y-2+2+y_start,z+z_start]), "blue"]
    let rectRefty2 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT-4,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,90+ang_z,[x+llargT-4,y-2+2+y_start,z+z_start]), "blue"]
    let rectRefty3 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+6,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,ang_z,[x+llargT+6,y-2+2+y_start,z+z_start]), "blue"]
    let rectRefty4 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+100-2,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,90+ang_z,[x+llargT+100-2,y-2+2+y_start,z+z_start]), "blue"]

    

    var model3d = [recttravpf1, recttravpf2, recttravpf3, recttravpf4,
        recttravpf5, recttravpf6,
        recttravpfa1, recttravpfa2,
        rectravll1, rectravll2,rectravll3, rectravll4,rect7,rect8,rect8v1,
        rect8v2,rect8v3, rect8v4,rectAll1, rectAll2, rectAll3, rectAll4, rectAll5, rectAll6,
         rectIll1, 
        rectIll2, rectIll3, rectIll4, rectIll5, rectIll6,
        rectIap1, rectIap2, rectIap3, rectIap4, rectIap5, rectIap6,
        rectampet1, rectampet2, rectampet3, rectampet4, rectampet5, rectampet6,
        rectRefty1, rectRefty2, rectRefty3, rectRefty4
    ]
    return model3d
}


function get_textos(x,y,z) {
    let text_llarg1 = [[x+25,y+10,z], "<--46 cm-->"]
    let text_llarg2 = [[x+75,y+10,z], "<--46 cm-->"]
    let text_llarg3 = [[x-20,y-10,z+25], "<--50 cm-->"]
    let text_llarg4 = [[x+106,y-10,z+70], "<- -  -      -     -     202 cm     -     -      - ->"]
    let text_llarg4v1 = [[x+52,y-4,z+60], "<- -  -      100 cm      - ->"]
    let text_llarg4v2 = [[x+158,y-4,z+60], "<- -  -      100 cm      - ->"]
    let text_llarg5 = [[x-20,y+20,z+70], " ^^ 42 cm vv"]
    let text_llarg6 = [[x+25,y+40,z-30], " ^^ 90 cm vv"]

    let textos = [
        text_llarg1, text_llarg2, text_llarg3, text_llarg4, text_llarg5, text_llarg6,
        text_llarg4v1, text_llarg4v2
    ]
    return textos
}

function dibuixa(a,b,c) {
    x =-90; y =-10; z = -10 // punt inicial en 3D
    //a,b,c angles de rotació

    let model3d = model_viscaSofa(x, y, z)  
    let mida_tot = dona_mides(model3d)
    console.log("quantitat de m de fusta necessària en llistons: " + mida_tot/100 + " m")
    
    console.log("quantitat d'elements: " + model3d.length)
    let textos = get_textos(x,y,z)
    

    for(var i=0;i<model3d.length;i++) {
        dibuix_rectangle(model3d[i],a,b,c)
        escriu_text(textos, a,b,c);
    }

    
}

// executa main()

main();
