function dona_mides(model) {
    let llargaria_total = 0
    console.log("mides del elements:")
    for(var i=0;i<model.length;i++) {
        let bloc = model[i][0]
        let mida_max = troba_mida_maxima(bloc)
        console.log(mida_max + " cm")
        llargaria_total = llargaria_total + mida_max
    }
    return llargaria_total
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