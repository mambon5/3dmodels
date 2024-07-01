/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function transl_bunch (mat1, cols, dic, dicword, descr) {
    //translate all columns in "cols" in matrix "mat1" to its right values/"descr"
    // using dictionary "dic". Where dictionary dic contains the entries to match 
    // at "dicword" and the description to translate to is "descr".
    word_len = 1;
    if(typeof(cols) != "string") word_len = cols.length;
    else cols = [cols]; // make it into an array
    
    res = JSON.parse(JSON.stringify(mat1));
    for(var i=0;i<word_len; i++) {
        dic2 = chg_col_name(dic, dicword, cols[i]);
        res = transl_column(res, dic2, cols[i], descr)
    }
    return res;
}

function chg_col_name(mat1, prevname, newname)
{
    if(typeof(prevname) != "string" || typeof(newname) != "string" ) {
        console.log("error, both prev and new names must be strings");
        return;
    }
    var res = JSON.parse(JSON.stringify(mat1));// avoid copy by reference
    for(var i=0;i<mat1.length; i++) {
        res[i][newname] = mat1[i][prevname]
        delete  res[i][prevname];        
    }
    return res;
}

function chg_arr_values(array, dict) {
    //dictionary contains "word" and "description".
    if(array.length==undefined) {
        console.log("error: 'array' is not an array.");
        return;
    }
    var res = JSON.parse(JSON.stringify(array));// avoid copy by reference
    for(var i=0;i<res.length; i++) {
        if(dict[array[i]] != undefined) { //this means word exists in dictionary
            res[i] = dict[array[i]];
        }       
    }
    return res;
}

function del_col(mat, cols) {
    coleng = 1;
    if(typeof(cols) != "string") coleng = cols.length;
    if(coleng == 1) cols = [cols]; // make it into an array
    
    var res = mat;
    for(var i=0;i<mat.length; i++) {
        for(var j=0;j<coleng; j++) {
            delete  res[i][cols[j]];        
        }   
    }
    return res;
}

function transl_column(mat1, dic, word, descr) {
    // using dictionary translate column "word" from "mat1" to "description"
    // dictionary should also have this "word" inside. It updates the column called 
    // "word" by "description" 
    
    
    var res = add_to_mat(mat1, dic, word, descr)
    res = del_col(res, word);
    res = chg_col_name(res, descr, word);
    
    return res;
    
}

function add_to_mat(mat1, mat2, comcol, addcols) {
    //add to matrix 1, by the common column and add columns "addcols"
    // from mat 2 to mat 1.
    var comcoleng = 1;
    if(typeof(comcol) != "string") comcoleng = comcol.length;
    if(comcoleng>1) {
        console.log("error, common column in merge matrix can only be 1 element");
        return;
    }
    
    
    var addcoleng = 1;
    if(typeof(addcols) != "string") addcoleng = addcols.length;
    if(addcoleng<1) {
        console.log("error, there must be at least 1 column to add in join matrix")
        return;
    }
    if(addcoleng == 1) addcols = [addcols]; // make it into an array
    
    var res =res = JSON.parse(JSON.stringify(mat1)); // avoid copy by reference
    for(var i=0;i<mat1.length; i++) {
        var word = mat1[i][comcol]
        
        var ind = "";
        if(isafari()) ind = mat2.macFindIndex( function(x) {return x[comcol]==word})
        else ind = mat2.findIndex( function(x) {return x[comcol]==word})
        for(var j=0; j<addcoleng; j++) {
            res[i][addcols[j]] = mat2[ind][addcols[j]];
        }
    }
    return res;
}


function vector_sum(v1, v2) {
    if(v1.length != v2.length) {
        console.log("error en prod_escalar(): vectors de mides diferents.")
        return;
    }
    var vector = [];
    for(var j=0;j<v1.length; j++) {
        vector.push(v1[j]+v2[j])
    }
    return vector;
}

function matrix_sum(mat1, mat2) {
    if(mat1[0].length != mat1[0].length || mat1.length != mat1.length) {
        console.log("error: matrix_sum(mat1, mat2) dimensions not fit for addition")
        return;
    }
    var resMat = [];

    //if mat2 is vector transform it to a 1 column vector first
    if(typeof(mat2[0]) == "number") mat2 = vector_to_column(mat2)

    for(var i=0;i<mat1.length; i++) {
        vector=[];
        for(var j=0;j<mat2[0].length; j++) {
            cell = cell + mat1[i][j]+mat2[i][j];
            vector.push(cell);
        }
        resMat.push(vector);
        
    }
    return resMat;
}

function matrix_multp(mat1, mat2) {
    if(mat1[0].length != mat2.length) {
        console.log("error: matrix_mult(mat1, mat2) dimensions not fit for multiplication")
        return;
    }
    var  resMat = [];

    //if mat2 is vector transform it to a 1 column vector first
    if(typeof(mat2[0]) == "number") mat2 = vector_to_column(mat2)

    for(var i=0;i<mat1.length; i++) {
        vector=[];
        for(var j=0;j<mat2[0].length; j++) {
            cell = 0
            for(var w=0;w<mat2.length; w++) {
                cell = cell + mat1[i][w]*mat2[w][j];
            }
            vector.push(cell);
        }
        resMat.push(vector);
        
    }
    return resMat;
}

function vec_per_escalar(vec, k) {
    var vector = []
    for(var w=0;w<vec.length; w++) {
        vector.push(vec[w]*k)
    }
    return vector
}

function vector_to_column(vector) {
    if(vector.length == 1) {
        console.log("error i vector_to_column(): vector has 1 element only")
        return;
    } else if(typeof(vector[0])=="object") {
        console.log("error i vector_to_column(): vector of vectors found")
        return;
    }
    var resVec = [];
    for(var w=0;w<vector.length; w++) {
        resVec.push([vector[w]]);
    }
    return resVec;
}

function column_to_vector(column) {
    if(column.length == 1) {
        console.log("error i column_to_vector(): vector has 1 element only")
        return;
    } else if(typeof(column[0])!="object") {
        console.log("error i column_to_vector(): vector of vectors not found")
        return;
    }
    var resVec = [];
    for(var w=0;w<column.length; w++) {
        resVec.push(column[w][0]);
    }
    return resVec;
}



mat1 = [[1,2,3], 
        [0,1,0]]
mat2 = [[-1,1], 
        [ 2,4], 
        [-1,3]]

        
vec1 = [1, 2, 0]
vec2 = [-1, 1,-1]
vec4 = [0,1,2]