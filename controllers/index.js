/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE usuario
 */
const usuarioControllers = require("./usuario");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE candidatos
 */
const candidatoControllers = require("./candidato");

/**
 * @description IMPORTAÇÃO DO CONTROLADOR DE candidatos
 */
const agentsControllers = require("./agentes");

module.exports = {
    usuarioControllers,
    candidatoControllers,
    agentsControllers,
};
