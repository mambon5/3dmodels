function ordena_tros_fusta(mat_trossos, mida_llisto,num_llist) {
    // aquesta funcio et diu com has de partir num_lllist llistons de mida mida_llisto cadascun
    // per a tal d'obtenir tots els trossos necessaris que venen donats en la matriu "mat_trossos"
    // assumim mat_trossos conté un vector per cada tipus de llisto que es neccessita
    // mat_trossos[0] = [10, 2] és a dir, 2 trossos de 10cm. La matriu ha d'estar ordenada per la primera columna
    // -es a dir, mat[1] = [12, 4], cada element de la matriu ha de contenir trossos més i més grans
    // num_llist = llistons disponibles
    // mida_llisto = mida de cada llisto disponible

    // return: mat_res 
    // mat_res[0] = [40, 40, 20, 15, 14, 5] dona com es partirà el primer llistó, i així succ.
    let mat_results = []
    let tall_actual =[]
    let queda = mida_llisto // mida del llisto que queda, que estem usant
    let tros_queden = trossos_queden(mat_trossos) // trossos que queden per tallar
    let i = 0 // el tipus de trossos que estem considerent, comencem amb els més grans
    
    while(tros_queden > 0 && num_llist > 0) {// sempre que quedi un tros per tallar i encara tiguem llistons disponibles
        if(i==mat_trossos.length) i = 0 //reiniciem el tros si es passa de l'últim
        if(mat_trossos[i][1]> 0 && (queda - mat_trossos[i][0]) >= 0) {// si queden trossos d'aquesta mida
                --mat_trossos[i][1]
                queda = queda - mat_trossos[i][0] 
                tall_actual.push(mat_trossos[i][0]) // afegim el tros al tallat actual
            }         
        
        else {
            // si no queden trossos d'aquesta mida, continuem
            if(i == (mat_trossos.length-1) ) { // cas base
                queda = mida_llisto // agafem un nou llistó
                --num_llist
                mat_results.push(tall_actual) // guardem el tall actual del llistó que hem acabat
                tall_actual =[]
            }
            //queden trossos per tallar pero aquest tros es massa gran, usem un tros més petit 
            ++i
            continue
        }
        tros_queden = trossos_queden(mat_trossos) // trossos que queden per tallar   
    }
    mat_results.push(tall_actual)
    if(num_llist == 0) {
        console.log("problema: Els llistons s'han acabat sense poder tallat tota la fusta!")
    }
    return mat_results
}

function trossos_queden(mat_trossos) {
    let tros_queden = 0 // trossos que queden per tallar
    for (let i=0; i<mat_trossos.length; i++) tros_queden = tros_queden + mat_trossos[i][1]
    return tros_queden
}