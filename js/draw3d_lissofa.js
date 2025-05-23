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

    x =-90; y =-10; z = -10 // punt inicial en 3D
    let model3d = model_viscaSofa(x, y, z)  
    let talls = dona_mides(model3d)
    console.log("trossos necessaris: ")
    console.log(talls)
    
    console.log("quantitat d'elements: " + model3d.length)


    dibuixa(model3d, alpha,beta,gamma);

    let res = ordena_tros_fusta(JSON.parse(JSON.stringify(talls)), 200, 18)    
    console.log("trossejat dels llistons: ")
    console.log(res)
}

function posaColor_segons_prof(cara, profunditats, color) {
    let profMax = profunditats[1]
    let profMin = profunditats[0]
    if(color != "black") return color
    let ProfMig = prof_mitja_cara(cara)
    // console.log("profunditat mitja rec: " + ProfMig)
    let valor = (ProfMig- profMin)/(profMax - profMin)
    // elegeix el color de la línia segons la profunditat relativa al model 3d
    if(valor < 0.25) color = "#202020"
    else if(valor < 0.5) color = "#383838"
    else if(valor < 0.75) color = "#505050"

    return color

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

function dibuix_rectangle(rectangle, profunditats) {
    let poliedre = rectangle[0]
    
    // preparant el camí
    ctx.beginPath();
     // rotant rectangle
    for(let j=0;j<poliedre.length;j++) {
        // pillant una cara
        var cara = poliedre[j]
        // dbuixant la cara rotada
        
        ctx.strokeStyle = posaColor_segons_prof(cara, profunditats, rectangle[1])      
        dibu_poliedre(cara)  
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
    recttravpfa1 = rectangle3d(x,alt_y-12,z+14,4,4,prof-14);
    recttravpfa2 = rectangle3d(x+llargT+100-2,alt_y-12,z+14,4,4,prof-14);
    

    // pal amun petit frontal    
    rect7 = rectangle3d(x,y,z+prof,4,alt_y,4);
    rect8 = rectangle3d(x+llargT/2-4,y,z+prof,4,alt_y,4);
    rect8v1 = rectangle3d(x+llargT-4,y,z+prof,4,alt_y,4);
    rect8v2 = rectangle3d(x+llargT+2,y,z+prof,4,alt_y,4);
    rect8v3 = rectangle3d(x+llargT+50+2,y,z+prof,4,alt_y,4);
    rect8v4 = rectangle3d(x+llargT+100-2,y,z+prof,4,alt_y,4);

    // pal amun petit darrere
    let zprofa = -4+14
    rectampet1 = rectangle3d(x,y+4,z+zprofa,4,alt_y-6,4);
    rectampet2 = rectangle3d(x+llargT/2-4,y+4,z+zprofa,4,alt_y-6,4);
    rectampet3 = rectangle3d(x+llargT-4,y+4,z+zprofa,4,alt_y-6,4);
    rectampet4 = rectangle3d(x+llargT+2,y+4,z+zprofa,4,alt_y-6,4);
    rectampet5 = rectangle3d(x+llargT+50+2,y+4,z+zprofa,4,alt_y-6,4);
    rectampet6 = rectangle3d(x+llargT+100-2,y+4,z+zprofa,4,alt_y-6,4);

    //travesanys llargs 
    
    // rect5 = rectangle3d(x,y,z+50,124,4,4);
    rectravll1 = rectangle3d(x,y+alt_y,z+prof,llargT,4,4);
    rectravll2 = rectangle3d(x+llargT+2,y+alt_y,z+prof,llargT,4,4);
    rectravll3 = rectangle3d(x,y+alt_y-2,z+zprofa,llargT,4,4);
    rectravll4 = rectangle3d(x+llargT+2,y+alt_y-2,z+zprofa,llargT,4,4);

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
        rectangle3d(x,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x,y+y_start,z+z_start+4]), ]
    let rectIap2 = [rotate_rectangle_from_point(
            rectangle3d(x+llargT/2-4,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT/2-4,y+y_start,z+z_start+4]), ]
    let rectIap3 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT-4,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT-4,y+y_start,z+z_start+4]), ]
    let rectIap4 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+2,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x,y+y_start,z+z_start+4]), ]
    let rectIap5 = [rotate_rectangle_from_point(
            rectangle3d(x+llargT+52,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT/2-4,y+y_start,z+z_start+4]), ]
    let rectIap6 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+100-2,y+y_start,z+z_start, 4, long, 4)[0], ang_x,0,0,[x+llargT+100-2,y+y_start,z+z_start+4]), ]

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
    

    // reforç transversal frontal y, evita moviment endir y
    let ang_z = 45
    long = 20
    y_start = alt_y-14
    z_start = prof
    let rectRefty1 = [rotate_rectangle_from_point(
        rectangle3d(x+4,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,ang_z,[x+4,y-2+2+y_start,z+z_start]), ]
    let rectRefty2 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT-4,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,90+ang_z,[x+llargT-4,y-2+2+y_start,z+z_start]), ]
    let rectRefty3 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+6,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,ang_z,[x+llargT+6,y-2+2+y_start,z+z_start]), ]
    let rectRefty4 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+100-2,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,90+ang_z,[x+llargT+100-2,y-2+2+y_start,z+z_start]), ]

  
    // reforç transversal traser y, evita moviment endir y
    z_start=10
    let rectReftytr1 = [rotate_rectangle_from_point(
        rectangle3d(x+4,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,ang_z,[x+4,y-2+2+y_start,z+z_start]), ]
    let rectReftytr2 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT-4,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,90+ang_z,[x+llargT-4,y-2+2+y_start,z+z_start]), ]
    let rectReftytr3 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+6,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,ang_z,[x+llargT+6,y-2+2+y_start,z+z_start]), ]
    let rectReftytr4 = [rotate_rectangle_from_point(
        rectangle3d(x+llargT+100-2,y-2+y_start,z+z_start, long, 4, 4)[0], 0,0,90+ang_z,[x+llargT+100-2,y-2+2+y_start,z+z_start]), ]


    // petit reforç traser entre reforços alts
    let altur_y = 30
    let rectPetitR1 = [rotate_rectangle_from_point(
        rectangle3d(x,y+altur_y,z, 4, 4, 9.5)[0], 0,0,0,[x+0+4,y,z-4+10]), ]
    let rectPetitR2 = [rotate_rectangle_from_point(
        rectangle3d(x+46,y+altur_y,z, 4, 4, 9.5)[0], 0,0,0,[x+0+4,y,z-4+10]), ]
    let rectPetitR3 = [rotate_rectangle_from_point(
        rectangle3d(x+96,y+altur_y,z, 4, 4, 9.5)[0], 0,0,0,[x+0+4,y,z-4+10]), ]
    let rectPetitR4 = [rotate_rectangle_from_point(
        rectangle3d(x+102,y+altur_y,z, 4, 4, 9.5)[0], 0,0,0,[x+0+4,y,z-4+10]), ]
    let rectPetitR5 = [rotate_rectangle_from_point(
        rectangle3d(x+152,y+altur_y,z, 4, 4, 9.5)[0], 0,0,0,[x+0+4,y,z-4+10]), ]
    let rectPetitR6 = [rotate_rectangle_from_point(
        rectangle3d(x+198,y+altur_y,z, 4, 4, 9.5)[0], 0,0,0,[x+0+4,y,z-4+10]), ]
    

    // tapa del seeint del sofà
    //pals llarg transversals al llarg de x
    let alty = 120
    let profz = 28
    let rectTapa1 = rectangle3d(x,y+alty,z+zprofa,100,4,4);
    let rectTapa2 = rectangle3d(x+102,y+alty,z+zprofa,100,4,4);
    let rectTapa3 = rectangle3d(x,y+alty,z+zprofa+profz+4,100,4,4);
    let rectTapa4 = rectangle3d(x+102,y+alty,z+zprofa+profz+4,100,4,4);

    //pals curts al llarg de z
    let rectTapa5 = rectangle3d(x,y+alty,z+zprofa+4,4,4,profz);
    let rectTapa6 = rectangle3d(x+100-4,y+alty,z+zprofa+4,4,4,profz);
    let rectTapa7 = rectangle3d(x+102,y+alty,z+zprofa+4,4,4,profz);
    let rectTapa8 = rectangle3d(x+202-4,y+alty,z+zprofa+4,4,4,profz);

    //reforç tapa
    let rectRefTapa1 = [rotate_rectangle_from_point(
        rectangle3d(x+3,y+alty,z+zprofa+10,10,4,4)[0], 0,45,0,[x+3,y+alty,z+zprofa+10]), ]
    let rectRefTapa2 = [rotate_rectangle_from_point(
        rectangle3d(x+102+3,y+alty,z+zprofa+10,10,4,4)[0], 0,45,0,[x+102+3,y+alty,z+zprofa+10]), ]
    let rectRefTapa3 = [rotate_rectangle_from_point(
        rectangle3d(x+87,y+alty,z+zprofa+20+10,10,4,4)[0], 0,45,0,[x+87,y+alty,z+zprofa+20+10]), ]
    let rectRefTapa4 = [rotate_rectangle_from_point(
        rectangle3d(x+102+87,y+alty,z+zprofa+20+10,10,4,4)[0], 0,45,0,[x+102+87,y+alty,z+zprofa+20+10]), ]

    let rectRefTapa5 = [rotate_rectangle_from_point(
        rectangle3d(x+6,y+alty,z+zprofa+23,10,4,4)[0], 0,-45,0,[x+6,y+alty,z+zprofa+23]), ]
    let rectRefTapa6 = [rotate_rectangle_from_point(
        rectangle3d(x+102+6,y+alty,z+zprofa+23,10,4,4)[0], 0,-45,0,[x+102+6,y+alty,z+zprofa+23]), ]
    let rectRefTapa7 = [rotate_rectangle_from_point(
        rectangle3d(x+90,y+alty,z+zprofa+3,10,4,4)[0], 0,-45,0,[x+90,y+alty,z+zprofa+3]), ]
    let rectRefTapa8 = [rotate_rectangle_from_point(
        rectangle3d(x+102+90,y+alty,z+zprofa+3,10,4,4)[0], 0,-45,0,[x+102+90,y+alty,z+zprofa+3]), ]

    var model3d = [recttravpf1, recttravpf2, recttravpf3, recttravpf4,
        recttravpf5, recttravpf6,
        recttravpfa1, recttravpfa2,
        rectravll1, rectravll2,rectravll3, rectravll4,rect7,rect8,rect8v1,
        rect8v2,rect8v3, rect8v4,rectAll1, rectAll2, rectAll3, rectAll4, rectAll5, rectAll6,
         rectIll1, 
        rectIll2, rectIll3, rectIll4, rectIll5, rectIll6,
        rectIap1, rectIap2, rectIap3, rectIap4, rectIap5, rectIap6,
        rectampet1, rectampet2, rectampet3, rectampet4, rectampet5, rectampet6,
        rectRefty1, rectRefty2, rectRefty3, rectRefty4,
        rectPetitR1,rectPetitR2,rectPetitR3,rectPetitR4,rectPetitR5,rectPetitR6,
        rectReftytr1,rectReftytr2,rectReftytr3,rectReftytr4,
        rectTapa1, rectTapa2, rectTapa3, rectTapa4,
        rectTapa5, rectTapa6, rectTapa7, rectTapa8,
        rectRefTapa1, rectRefTapa2, rectRefTapa3, rectRefTapa4, rectRefTapa5, rectRefTapa6, rectRefTapa7, rectRefTapa8
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
    let text_titolTapa = [[x+220,y+130,z-15], "Tapa del banc del sofa, 2 de 100cm x 36cm x 4cm"]

    let textos = [
        text_llarg1, text_llarg2, text_llarg3, text_llarg4, text_llarg5, text_llarg6,
        text_llarg4v1, text_llarg4v2, text_titolTapa
    ]
    return textos
}

function dibuixa(model, a,b,c) {
    
    //a,b,c angles de rotació

    // genera els textos
    let textos = get_textos(x,y,z)
    
    // rota el model
    let model_rotat = rota_model(model,a,b,c)
    
    //calcular profunditat mínima i màxim
    let profunds = profundis(model_rotat)
    console.log("profunditats del model:")
    console.log(profunds)
    
    for(var i=0;i<model_rotat.length;i++) {
        dibuix_rectangle(model_rotat[i],profunds)
        escriu_text(textos, a,b,c);
    }

    
}

// executa main()

main();
