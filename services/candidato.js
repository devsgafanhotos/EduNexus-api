// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA candidato DO BANCO DE DADOS
const { candidato_model, token_model } = require("../models/supabase");
const jwt = require("jsonwebtoken");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const usuarioServices = require("./usuario");

class candidatoServices {
    /**
     * @param {Object} novo_candidato - Objecto com os dados do novo candidato
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createCandidato(novo_candidato) {
        try {
            let responseVerify = await usuarioServices.verifyUserEmail({
                email: novo_candidato.email,
                model: candidato_model,
            });

            if (responseVerify.success) {
                return {
                    success: false,
                    status: 409,
                    message: "Email indisponível!",
                };
            }

            /**
             * @description NESTE TRECHO GERAMOS O HASH DA SENHA A PARTRIR DO Nº DE TELEFONE
             */
            const senhaHash = await usuarioServices.createHash(
                novo_candidato.senha
            );

            const response = await candidato_model.create({
                nome: novo_candidato.nome,
                email: novo_candidato.email,
                telefone: novo_candidato.telefone,
                senha: senhaHash,
            });

            return {
                success: true,
                message: "Cadastro feito com sucesso!",
                usuario: response,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao efeituar cadastro",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} data - Objecto com os dados do novo candidato
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async loginCandidato(data, res) {
        try {
            const responseEmail = await usuarioServices.verifyUserEmail({
                email: data.email,
                model: candidato_model,
            });

            if (!responseEmail.success) {
                return {
                    success: false,
                    status: 404,
                    message: "Email inexistente!",
                };
            }
            /**
             * @description NESTE TRECHO VERIFICAMOS SE A SENHA FORNECIDA CORRESPONDE A SENHA DO FUNCIONÁRIO
             */

            const responseSenha = await usuarioServices.verifyHash(
                responseEmail.data.senha,
                data.senha
            );

            if (!responseSenha) {
                return {
                    success: false,
                    status: 404,
                    message: "Senha incorreta!",
                };
            }

            /**
             * @description NESTE TRECHO GERAMOS OS TOKENS {ACCESS E REFRESH}
             */
            const payload = {
                id: responseEmail.data.id,
                email: responseEmail.data.email,
                nome: responseEmail.data.nome,
            };
            const ACCESS_TOKEN = await usuarioServices.createTokenACCESS(
                payload
            );

            const REFRESH_TOKEN = await usuarioServices.createTokenREFRESH(
                payload
            );
            console.log(REFRESH_TOKEN);
            

            /**
             * @description NESTE TRECHO GURDAMOS O TOKE DE REFRESH NO BANCO DE DADOS
             */
            token_model.create({
                id_candidato: responseEmail.data.id,
                refresh_token: REFRESH_TOKEN,
            });

            /**
             * @description NESTE TRECHO GURDAMOS O TOKE DE REFRESH NUM COOKIE
             */
            const COOKIE_EXPIRATION = process.env.COOKIE_EXPIRATION;
            
            res.cookie("refresh_token", REFRESH_TOKEN, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: COOKIE_EXPIRATION,
            });

            return {
                success: true,
                message: "Seja bem-vindo!",
                user: responseEmail.data,
                access_token: ACCESS_TOKEN,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao efeituar login",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Object} data - Objecto com os dados do novo candidato
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async logoutCandidato(req, res) {
        try {
            const { user } = req.body;
            const refresh_token = req.cookies.refresh_token;

            if (user) {
                token_model.delete({
                    id_candidato: user.id,
                });
            } else {
                if (refresh_token) {
                    token_model.delete({
                        refresh_token: refresh_token,
                    });
                }
            }

            res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: true, // true se estiver em https
            });

            return {
                success: true,
                rs: user,
                message: "Volte sempre...",
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao fazer logout",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do candidato desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o candidato desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getCandidato(id) {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO candidato ENVIADO EXISTE
             */
            let candidato_encontrado = await candidato_model.selectOne({
                id: id,
            });
            if (!candidato_encontrado) {
                return {
                    success: false,
                    message: "ID do candidato inexistente!",
                };
            }

            return {
                success: true,
                message: "Candidato encontrado!",
                data: candidato_encontrado,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar candidato",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do candidato desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o candidato desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async getCandidatos() {
        try {
            /**
             * @description NESTE TRECHO VERIFICACAMOS SE O ID DO candidato ENVIADO EXISTE
             */
            let candidatos_encontrados = await candidato_model.select();

            return {
                success: true,
                message: "Candidatos encontrados!",
                data: candidatos_encontrados,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar candidato",
                errors: `${error}`,
            };
        }
    }
}

module.exports = new candidatoServices();
