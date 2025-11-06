/**
 * @description OBJECTO DE ROTEAMENTO
 */
const router = require("express").Router();

/**
 * @description INTEGRAÇÃO DA ROTA DE candidatoS AO ROTEADOR PRINCIPAL
 */
const candidatoRoutes = require("./candidato");
router.use("/candidato", candidatoRoutes);

/**
 * @description INTEGRAÇÃO DA ROTA DE autenticação AO ROTEADOR PRINCIPAL
 */
const authRoutes = require("./auth");
router.use("/auth", authRoutes);

module.exports = { router };
