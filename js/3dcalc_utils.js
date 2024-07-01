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