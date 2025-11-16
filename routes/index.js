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

/**
 * @description INTEGRAÇÃO DA ROTA DE autenticação AO ROTEADOR PRINCIPAL
 */
const agentsRoutes = require("./agents");
router.use("/agents", agentsRoutes);

router.get("/bot", (req, res) => {
    const { key } = req.query;
    const users = [];
    if ((key !== "botpress.com1234")) {
        return res.status(403).json({
            msg: "Não autorizado",
        });
    }
    return res.status(200).json({
        msg: "Plataforma de busca de empregos",
        usuarios: users,
    });
});

module.exports = { router };
