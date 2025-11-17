// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA agents DO BANCO DE DADOS
const { iteracoes_model } = require("../models/supabase");
const axios = require("axios");
const { recomendacoes } = require("./data/Recomendacoes");

class agentsServices {
    /**
     * @param {Number} id - ID do agents desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o agents desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async novasRecomendacoes(data) {
        try {
            const { user, formData } = data;
            const requestObject = {
                sessionId: user.id,
                usuario: {
                    nome: user.nome,
                },

                contactos: {
                    email: user.email,
                    telefone: user.telefone,
                },

                nivel_educacao: formData.nivel_educacao,
                interesse: formData.interesse,
                regiao: formData.regiao,
            };

            const response = await axios.post(
                "https://webdevs04.app.n8n.cloud/webhook/e7c3d084-b9e6-4ee2-b763-3774c2b6bfc5",
                requestObject,
                { timeout: 240000 } // 4 minutos
            );

            return {
                success: true,
                message: "Recomendações curriculares!",
                recomendacaoCriada: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar recomendações",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do agents desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o agents desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async createRecomendacoes(data) {
        try {
            const recomendacaoCriada = await iteracoes_model.create({
                id_candidato: data.id,
                titulo: data.interesse,
                recomendacao: data.recomendacao,
            });

            return {
                success: true,
                message: "Recomendações curriculares!",
                recomendacaoCriada: recomendacaoCriada,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar recomendações",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do agents desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o agents desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async buscarRecomendacoes(id) {
        try {
            let response;

            if (!id) {
                response = await iteracoes_model.select();
            } else {
                response = await iteracoes_model.selectOne({ id: id });
            }

            return {
                success: true,
                message: "Recomendações curriculares!",
                data: response,
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar recomendações",
                errors: `${error}`,
            };
        }
    }

    /**
     * @param {Number} id - ID do agents desejado
     * @returns {{
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto contendo o agents desejado(em caso de sucesso), ou mensagens de erro em caso de insucesso.
     */
    async buscarEmpregos() {
        try {
            return {
                success: true,
                message: "Empregos enconrados!",
                empregos: {},
            };
        } catch (error) {
            return {
                success: false,
                message: "Erro ao buscar empregos",
                errors: `${error}`,
            };
        }
    }
}

module.exports = new agentsServices();
