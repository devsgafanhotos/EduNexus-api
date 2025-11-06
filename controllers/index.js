/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE usuario
 */
const usuarioControllers = require("./usuario");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE candidatos
 */
const candidatoControllers = require("./candidato");

module.exports = {
    usuarioControllers,
    candidatoControllers,
};
