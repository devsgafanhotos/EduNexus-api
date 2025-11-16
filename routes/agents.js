const agentsRouter = require("express").Router();
const { agentsControllers } = require("../controllers");

/**
 * @description ROTA QUE RECEBE UM EMAIL E VERIFICA SE ELE JÁ EXISTE
 * @route /agents/recomendacao
 */
agentsRouter.post("/recomendacao", agentsControllers.novasRecomendacoes);

/**
 * @description ROTA QUE RECEBE UM EMAIL E VERIFICA SE ELE JÁ EXISTE
 * @route /agents/recomendacao
 */
agentsRouter.get("/recomendacao", agentsControllers.buscarRecomendacoes);

/**
 * @description ROTA QUE RECEBE UM EMAIL E VERIFICA SE ELE JÁ EXISTE
 * @route /agents/empregos
 */
agentsRouter.post("/empregos", agentsControllers.buscarEmpregos);

module.exports = agentsRouter;
