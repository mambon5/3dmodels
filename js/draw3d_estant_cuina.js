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

    x =-40; y =-40; z = -10 // punt inicial en 3D
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
        // Aplica la mida de la font
        fontSize =5
        ctx.font = fontSize*canvas_zoom*userZoom + "px Arial";
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
    let prof = 30
    let llargT = 72
    let alt_y=74
    let gruix_f = 2

    var model3d = []

    //placa abaix  
    model3d.push(rectangle3d(x,y,z,llargT,gruix_f,prof))

    //placa adalt
    model3d.push(rectangle3d(x,y+alt_y,z,llargT,gruix_f,prof))

    //lateral esquerre
    model3d.push(rectangle3d(x,y+gruix_f,z,gruix_f,alt_y-gruix_f,prof))

    //lateral dret
    model3d.push(rectangle3d(x+llargT-gruix_f,y+gruix_f,z,gruix_f,alt_y-gruix_f,prof))

    //placa fons dreta
    ample_estants_dreta = 23
    model3d.push(rectangle3d(x+llargT-gruix_f-ample_estants_dreta,y,z-gruix_f,ample_estants_dreta+gruix_f,alt_y+gruix_f,gruix_f))

    //estants dreta
    model3d.push(rectangle3d(x+llargT-gruix_f-ample_estants_dreta,y+20,z-gruix_f,ample_estants_dreta,gruix_f,prof))
    model3d.push(rectangle3d(x+llargT-gruix_f-ample_estants_dreta,y+40,z-gruix_f,ample_estants_dreta,gruix_f,prof))
    model3d.push(rectangle3d(x+llargT-gruix_f-ample_estants_dreta,y+60,z-gruix_f,ample_estants_dreta,gruix_f,prof))


    //placa fons dreta
    ample_estants_esq = 12
    model3d.push(rectangle3d(x,y,z-gruix_f,ample_estants_esq+gruix_f,alt_y+gruix_f,gruix_f))
    
    //estants esq
    model3d.push(rectangle3d(x,y+20,z-gruix_f,ample_estants_esq,gruix_f,prof))
    model3d.push(rectangle3d(x,y+40,z-gruix_f,ample_estants_esq,gruix_f,prof))
    model3d.push(rectangle3d(x,y+60,z-gruix_f,ample_estants_esq,gruix_f,prof))


    // caldera
    ang_z = 4
    model3d.push([rotate_rectangle_from_point(
        rectangle3d(x+13.5+gruix_f,y+gruix_f,z, 34, 67, 30)[0], 0,0,ang_z,[x+0+4,y,z-4+10]), "red"])

    return model3d
}


function get_textos(x,y,z) {
    let textos = [    ]
    textos.push([[x+25,y+10,z], "caldera"])
    // let text_llarg2 = [[x+75,y+10,z], "<--46 cm-->"]
    // let text_llarg3 = [[x-20,y-10,z+25], "<--50 cm-->"]
    // let text_llarg4 = [[x+106,y-10,z+70], "<- -  -      -     -     202 cm     -     -      - ->"]
    // let text_llarg4v1 = [[x+52,y-4,z+60], "<- -  -      100 cm      - ->"]
    // let text_llarg4v2 = [[x+158,y-4,z+60], "<- -  -      100 cm      - ->"]
    // let text_llarg5 = [[x-20,y+20,z+70], " ^^ 42 cm vv"]
    // let text_llarg6 = [[x+25,y+40,z-30], " ^^ 90 cm vv"]
    // let text_titolTapa = [[x+220,y+130,z-15], "Tapa del banc del sofa, 2 de 100cm x 36cm x 4cm"]

    
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
