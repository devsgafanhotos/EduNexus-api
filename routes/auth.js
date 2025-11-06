const candidatoRouter = require("express").Router();
const { authanticateAccess, refreshAccess } = require("../middlewares/auth");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO candidato E CADASTRA NO BANCO
 * @route /auth/acces
 */
candidatoRouter.post("/acces", authanticateAccess);

/**
 * @description ROTA QUE GERA NOVOS TOKENS DE ACESSO
 * @route /auth/refresh
 */
candidatoRouter.post("/refresh", refreshAccess);

module.exports = candidatoRouter;
