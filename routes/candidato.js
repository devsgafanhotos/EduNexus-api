const candidatoRouter = require("express").Router();
const { candidatoControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO candidato E CADASTRA NO BANCO
 * @route /candidato/registro
 */
candidatoRouter.post("/registo", candidatoControllers.cadastrarCandidato);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO candidato E CADASTRA NO BANCO
 * @route /candidato/login
 */
candidatoRouter.post("/login", candidatoControllers.loginCandidato);

/**
 * @description ROTA QUE RECEBE OS DADOS DE UM NOVO candidato E CADASTRA NO BANCO
 * @route /candidato/logout
 */
candidatoRouter.post("/logout", candidatoControllers.logoutCandidato);

/**
 * @description ROTA QUE RETORNA TODOS OS candidatoS
 * @route /candidato/perfil/:id
 */
candidatoRouter.get("/perfil/:id", candidatoControllers.perfilCandidato);

/**
 * @description ROTA QUE RETORNA UM candidato ESPECÍFICO
 * @route /candidato/listar
 */
candidatoRouter.get("/listar", candidatoControllers.listarCandidatos);

module.exports = candidatoRouter;
