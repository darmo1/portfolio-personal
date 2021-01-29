/**
 * Entrada de tu aplicación
 */


const { crearArchivo } = require("./helpers/multiplicar");
const argv = require('./config/yargs')


crearArchivo(argv.b, argv.l, argv.h)
  .then((response) => console.log("archivo creado", response))
  .catch((error) => console.error(error));
