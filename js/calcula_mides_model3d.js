function dona_mides(model) {
    // agafa un model 3d composat per blocs, i torna un vector amb totes les mides màximes de cada bloc
    // la idea es que la mida més llarga és la unica important per tallar els llistons i així sabem
    // quins talls hem de fer
    let trossos = []
    let llarg_tot = 0
    for(var i=0;i<model.length;i++) {
        let bloc = model[i][0]
        let mida_max = troba_mida_maxima(bloc)
        // console.log(mida_max + " cm")
        llarg_tot = llarg_tot+mida_max
        trossos.push(mida_max)
    }
    console.log("llarg total de fusta necessària: "+llarg_tot/100+" m")
    return ordena_talls(trossos)
}

function ordena_talls(talls) {
    // creem la matriu de trossos adient per calcular els tallls dels llistons en una 
    // altra funció "ordena_trossos_fusta"
    if(talls.length ==0) {
        console.log("no hi ha talls ordenar")
        return
    }
    let w = 0
    talls = talls.sort((a,b) => b-a)
    let talls_orden = [[talls[0],1]]    
    for(let i=1;i<talls.length; ++i) {
        if(talls[i] == talls[i-1]) ++talls_orden[w][1] // igual que l'últim que hi hem posat
        else {
            talls_orden.push([talls[i],1])
            ++w
        }
    }
    return talls_orden
}

function distCla2(punt1, punt2) {
    // distancia euclídia classica 2, elevar al quadrat, sumar i fer arrel
    let dist = 0
    for(var i=0;i<punt1.length;i++) {
        dist = dist + Math.pow(punt1[i]-punt2[i],2)
    }
    return Math.sqrt(dist)
}

function max_mida_cara_rectangle(cara) {
    let max = 0

    for(var i=0;i<cara.length;i++) {
        for(var j=i+1;j<cara.length;j++) {
            // i - j % 2 != 0 means the two points are adjecent ( we avoid diagonal elements)
            if( (i-j) % 2 != 0) max = Math.max( max, distCla2(cara[i], cara[j]))
        }
    }
    return max

}

function troba_mida_maxima(rectangle_3d) {
    let max = 0
    for(var i=0;i<rectangle_3d.length;i++) {
        let cara = rectangle_3d[i]
        max = Math.max(max, max_mida_cara_rectangle(cara))
    }
    return max
}