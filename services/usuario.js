const { Op, col, where } = require("sequelize");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA funcionario DO BANCO DE DADOS
const { usuario_model } = require("../models/supabase");

class usuarioServices {
    /**
     * @param {Object} param0
     * @param {*} param0.email
     * @param {*} param0.model
     * @returns {{
     *      success: Boolean,
     *      data: JSON
     * }} - Retorna true se já existe e false se ele não exite
     */
    async verifyUserEmail({ email, model }) {
        /**
         * @description NESTE TRECHO VERIFICAMOS SE O EMAIL DO usuario ESTÁ DISPONÍVEL
         */
        let usuario_encontrado = await model.selectOne({ email: email });

        if (!usuario_encontrado) {
            return {
                success: false,
            };
        }

        return {
            success: true,
            data: usuario_encontrado,
        };
    }

    /**
     *
     * @param {String} string - String que desejamos gerar o hash
     * @returns {String} - Palavra hashada
     */
    async createHash(string) {
        return await argon2.hash(string, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64 MB
            timeCost: 3, // nº de iterações
            parallelism: 1, // threads
        });
    }

    /**
     * @param {hash} hash - Hash com o qual vmos comparar a string
     * @param {String} string - String que desejamos comparar
     * @returns {Boolean} - true se a String Corresponde ao hash e false caso não correspondam
     */
    async verifyHash(hash, string) {
        const valid = await argon2.verify(hash, string);
        return valid;
    }

    /**
     * @param {JSON} payload - Dados que serão guardados no token
     * @param {String} type - Tipo de token a gerar {ACCESS, REFRESH}
     * @returns {String} Token gerado
     */
    async createTokenACCESS(payload) {
        const token = jwt.sign({ payload }, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRATION,
        });
        return token;
    }

    /**
     * @param {JSON} payload - Dados que serão guardados no token
     * @param {String} type - Tipo de token a gerar {ACCESS, REFRESH}
     * @returns {String} Token gerado
     */
    async createTokenREFRESH(payload) {
        const token = jwt.sign({ payload }, REFRESH_TOKEN_SECRET, {
            expiresIn: REFRESH_TOKEN_EXPIRATION,
        });
        return token;
    }
}
module.exports = new usuarioServices();
