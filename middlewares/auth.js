const { token_model, candidato_model } = require("../models/supabase");
const jwt = require("jsonwebtoken");
const { usuarioServices } = require("../services");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

class AutenticacaoMiddleware {
    /**
     *@description Autenticação de acesso
     *@route /auth/acces
     */
    authanticateAccess = (req, res) => {
        const access_token = req.headers["authorization"]?.split(" ")[1];
        const refresh_token = req.cookies.refresh_token;

        // SE NÃO TIVER UM TOKEN DE ACESSO
        if (access_token === "null") {
            // MAS TIVER UM DE REFRESO, ENTÃO TOKEN EXPIRADO
            if (refresh_token) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Token expirado!",
                });
            }

            return res.status(403).json({
                status: 403,
                success: false,
                message: "Início de sessão obrigatório!",
            });
        }

        // SETIVER UM TOKEN DE ACESSO, VERIFICAMO-LO COM A CHAVE.
        jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err, user) => {
            //SE O TOKEN DE ACESSO TIVER EXPIRADO, avismos que o token espirou
            if (err) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Token expirado!",
                });
            }

            // SE O TOKEN DE ACESSO ESTIVER EM DIA, ENTÃO OK.
            return res.status(200).json({
                status: 200,
                success: true,
                access_token: access_token,
                user: user.payload,
                message: "Acesso permitido!",
            });
        });
    };

    /**
     *@description Autenticação de acesso
     *@route /auth/refresh
     */
    refreshAccess = async (req, res) => {
        const refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6Imhlcm1lbmVnaWxkb3dpbHNvbjdAZ21haWwuY29tIiwibm9tZSI6IkhlcmVtZW5lZ2lsZG8gV2lsc29uIn0sImlhdCI6MTc2MzMxOTQyMywiZXhwIjoxNzYzOTI0MjIzfQ.1jDYqgCGGHjIxir3fjKOiKp6HoXwjRQ_MLvG9ZJZswc"//req.cookies.refresh_token;

        // SE NÃO TIVER UMTOKEN DE REFRESCO, FAÇA LOGIN
        if (!refresh_token) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Token inválido!",
            });
        }

        // SETIVER UM TOKEN DE REFRESCO, VERIFICAMO-LO COM A CHAVE.
        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, async (err, user) => {
            //SE O TOKEN DE REFRESCO TIVER EXPIRADO, FAÇA LOGIN
            if (err) {
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: "Token inválido!",
                });
            }

            // SE O TOKEN DE REFRESCO ESTIVER EM DIA, ENTÃO VERIFICAMOS SE EXISTE NO BANCO.
            const refresh_token_exist = await token_model.selectOne({
                refresh_token: refresh_token,
            });
            if (refresh_token_exist) {
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: "Token inválido!",
                });
            }

            //SE TUDO ESTÁ OK, ENTÃO GERAMOS UM NOVO TOKEN DE ACESSO
            const ACCESS_TOKEN = await usuarioServices.createTokenACCESS(
                user.payload
            );

            return res.status(200).json({
                status: 200,
                success: true,
                user: user.payload,
                access_token: ACCESS_TOKEN,
                message: "Token renovado!",
            });
        });
    };

    /**
     *@description Verificação se o usuario pode seguir para a próxima rota.
     
    authanticateAcces = (req, res, next) => {
        const access_token = req.headers["authorization"]?.split(" ")[1];

        // SE NÃO TIVER UMTOKEN DE ACESSO, FAÇA LOGIN
        if (!access_token) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Início de sessão obrigatório!",
            });
        }

        // SETIVER UM TOKEN DE ACESSO, VERIFICAMO-LO COM A CHAVE.
        jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err, user) => {
            //SE O TOKEN DE ACESSO TIVER EXPIRADO, avismos que o token espirou
            if (err) {
                return res.status(401).json({
                    status: 401,
                    success: false,
                    message: "Token expirado!",
                });
            }

            // SE O TOKEN DE ACESSO ESTIVER EM DIA, ENTÃO OK.
            next();
        });
    };

    */
}

module.exports = new AutenticacaoMiddleware();
