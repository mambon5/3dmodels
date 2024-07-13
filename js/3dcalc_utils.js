function proj_3d_a_2d(v1, v2, vector) {
    // v1 i v2 son dos vectors indep en 3d pertanyent del pla PI on projectem
    // useu si us plau v1 i v2 vectors d'una base ortonormal
    let vecsBase = creaBase2vects(v1, v2)
    v1 = vecsBase[0]
    v2 = vecsBase[1]
    var v3 = prod_vectorial(v1, v2)
    var result = matrix_multp([v1, v2, v3], vector)
    return column_to_vector(result)
}

function profundis(model) {
    // calcula la profunditat màxima i mínima
    let min = model[0][0][0][0][2] // primer rectangle, conjunt de punts, primera cara, primer punt, tercera coord z
    let max = min
    if(model.length== 0) {
        console.log("error, funció profMax el model no te cap subelement")
        return
    }
    for(var i=0;i<model.length;i++) {
        let rectangle = model[i][0]
        aux = prof_rectangle(rectangle)
        max = Math.max(max, aux[1]) // max actual i del rectangle
        min = Math.min(min, aux[0]) // min actual i del rectangle
        // console.log("max rectangle: " + aux[1] + ", min rectangle: " + aux[0])
    }
    return [min, max]
}

function prof_rectangle(rectangle) {
    // calcula la profunditat màxima i mínima d'un rectangle
    let min = rectangle[0][0][2]
    let max = min
    if(rectangle.length== 0) {
        console.log("error, funció profMax el rectangle no te cap subelement")
        return
    }
    
    for(var j=0;j<rectangle.length;j++) {
        let cara = rectangle[j]
        for(var w=0;w<cara.length;w++) {
            max = Math.max(max, cara[w][2]) // pillem la tercera coordenada i calculem el max
            min = Math.min(min, cara[w][2]) // pillem la tercera coordenada i calculem el max
            // console.log("profunditat punt: " + cara[w][2])
        }
    }
    
    return [min, max]
}

function prof_mitja_cara(cara) {
    // calcula la profunditat màxima i mínima d'un rectangle
    let sum = 0
    let npunts = 0
    if(cara.length== 0) {
        console.log("error, funció profMax el cara no te cap subelement")
        return
    }

        for(var w=1;w<cara.length;w++) {
            npunts = npunts + 1
            sum = sum + prof_mitja_linia(cara[w-1], cara[w])
           
            
        }
        npunts = npunts + 1
        sum = sum + prof_mitja_linia(cara[cara.length-1],cara[0] )
    
    
    return sum/npunts
}

function prof_mitja_rectangle(rectangle) {
    // calcula la profunditat màxima i mínima d'un rectangle
    let sum = 0
    let npunts = 0
    if(rectangle.length== 0) {
        console.log("error, funció profMax el rectangle no te cap subelement")
        return
    }
    
    for(var j=0;j<rectangle.length;j++) {
        let cara = rectangle[j]
        for(var w=1;w<cara.length;w++) {
            npunts = npunts + 1
            sum = sum + prof_mitja_linia(cara[w-1], cara[w])
           
        }
        sum = sum + prof_mitja_linia(cara[cara.length-1],cara[0] )
    }
    
    return sum/npunts
}

function prof_mitja_linia(punt1, punt2) {
    // torna la mitja de la coordenada z de dos punts en R3
    let profM = (punt1[2]+punt2[2])/2
    return profM
}

