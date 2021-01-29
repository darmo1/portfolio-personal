const fs = require("fs");

const crearArchivo = (base = 5, listar = false, hasta = 10) => {
  return new Promise((resolve, reject) => {

    let salida = "";

    for (let i = 1; i <= hasta; i++) {
      salida += `${base}x${i} = ${base * i} \n`;
    }

    if (listar) {
      console.log("-------------------------------");
      console.log("****Table de multiplicación****");
      console.log("-------------------------------");
      console.log(salida);
    }

    fs.writeFile(`./salidas/tabla-del-${base}.txt`, salida, (err) => {
      if (err) {
        const error = new Error();
        reject(error);
      }
      resolve(`tabla-del-${base}.txt`);
      console.log(salida);
    });
  });
};

module.exports = {
  crearArchivo,
};
