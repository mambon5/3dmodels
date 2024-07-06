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
                    [   0, Math.cos(a), -Math.sin(a)],
                    [   0, Math.sin(a), Math.cos(a)] ]
    
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

function rotate_vec(a,b,c,vector) {
    Rot = rotation_matrix(a,b,c)
    return matrix_multp(Rot,vector)
}

function rotate_vec_from_point(a,b,c,vector, point) {
    Rot = rotation_matrix(a,b,c)
    // console.log("rotate vec from point: ")
    // console.log("initial vector: "); console.log(vector)
    // console.log("punt: "); console.log(point)
    // console.log(" vector menys punt: "); console.log(vector_sum(vector, vec_per_escalar(point,-1)))
    let vec = vector_sum(vector, vec_per_escalar(point,-1))
    vec = matrix_multp(Rot,vec)
    // console.log(" matriu rot: "); console.log(Rot)
    // console.log(" vec rotat: "); console.log(vec)
    vec = vector_sum(vec, point)
    // console.log("punt 2: "); console.log(point)
    // console.log(" vector mes punt: "); console.log(vec) 
    return vec
}

function rotate_rectangle_from_point(rectangle, a,b,c, point) {
    let rect = rectangle;
    // rotant rectangle
    for(let j=0;j<rectangle.length;j++) {
       // pillant una cara
       var cara = rectangle[j]
       for(var i=0; i< rectangle[j].length; i++) {
           // pillant cada vector de la cara
           cara[i] = rotate_vec_from_point(a,b,c,rectangle[j][i], point)
       }
       // guardant la cara rotada
       rect[j] = cara
   }
   return rect;
}