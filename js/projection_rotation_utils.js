function prod_escalar(v1, v2) {
    if(v1.length != v2.length) {
        console.log("error en prod_escalar(): vectors de mides diferents.")
        return;
    }
    var res = 0
    for(let i=0;i<v1.length; i++) res = res + v1[i]*v2[i]
    return res;
}

function prod_vectorial(v1, v2) {
    var v3 = [v1[1]*v2[2] - v1[2]*v2[1], v1[2]*v2[0] - v1[0]*v2[2], 
    v1[0]*v2[1] - v1[1]*v2[0]]
    return v3;
}

function norma_vec(v) {
    var norma = 0;
    for(let i=0;i<v.length; i++) norma = norma + v[i]*v[i]
    norma = Math.sqrt(norma)
    return norma
}

function normalitza_vect(v) {
    var norma = norma_vec(v)
    vector = []
    for(let i=0;i<v.length; i++) vector.push(v[i]/norma)
    return vector;
}

function ortogonalitza_vects(v1, v2) {
    var escal = prod_escalar(v1, v2)
    var norma2 = norma_vec(v2)
    var v1_nou = vector_sum(v1, vec_per_escalar(v2, (-1)*escal/Math.pow(norma2, 2)))
    return [v1_nou, v2];
}

function creaBase2vects(v1, v2) {
    var vecsOrt = ortogonalitza_vects(v1, v2)

    v1 = vecsOrt[0]
    var norma = norma_vec(v1)
    v1 = vec_per_escalar(v1, 1/norma)

    v2 = vecsOrt[1]
    norma = norma_vec(v2)
    v2 = vec_per_escalar(v2, 1/norma)
    return [v1, v2]
}

function rotation_matrix(a, b, c) {
    // 3 rotacions d'angles a,b,c per a cada eix x,y,z respectivament
    // angles en graus
    a = a*Math.PI/180
    b = b*Math.PI/180
    c = c*Math.PI/180
    var matRx = [   [          1,            0, 0],
                    [   0, Math.cos(b), -Math.sin(b)],
                    [   0, Math.sin(b), Math.cos(b)] ]
    
    var matRy = [   [Math.cos(b),   0, Math.sin(b)],
                    [          0,            1, 0],
                    [-Math.sin(b),  0, Math.cos(b)] ]
    
    var matRz = [   [Math.cos(c), -Math.sin(c), 0],
                    [Math.sin(c),  Math.cos(c), 0],
                    [          0,            0, 1]] ;
    
    var matR = matrix_multp(matRx, matRy);
    var matR = matrix_multp(matR, matRz);
    return matR;
}