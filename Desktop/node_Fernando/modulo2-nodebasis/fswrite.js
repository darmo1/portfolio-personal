console.log("-------------------------------")
console.log("****Table de multiplicación****")
console.log("-------------------------------")

const fs = require('fs')

const base = 5;
let salida;
for (let i=1 ; i<=10; i++){
    salida += `${base}x${i} = ${base*i} \n`
}

fs.writeFile(`tabla-del-${base}.txt`, salida, err => {
    if(err){
        throw err;
    }
    console.log(`tabla-del-${base} creada`)
})