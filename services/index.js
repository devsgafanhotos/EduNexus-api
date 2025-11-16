/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE candidatoS
 */
const candidatoServices = require("./candidato");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE usuario
 */
const usuarioServices = require("./usuario");

/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇO DE usuario
 */
const agentsServices = require("./agents");

module.exports = {
    candidatoServices,
    usuarioServices,
    agentsServices
};
