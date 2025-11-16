// IMPORTAÇÃO DO MODEL DE ITERAÇÃO COM A TABELA agents DO BANCO DE DADOS
const { agents_model, token_model } = require("../models/supabase");
const axios = require("axios");

const { recomendacoes } = require("./data/Recomendacoes");
const { empregos } = require("./data/Empregos");

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
            const interesses = data.formData;
            const usuario = data.user;
            console.log("\n\nA prpcessar ........");

            const res = await axios.post(
                "https://chart-der-hung-span.trycloudflare.com/webhook-test/master-api",
                { interesses, usuario }
            );
            console.log("\n\nResposta ........" + res);

            return {
                success: true,
                message: "Recomendações curriculares!",
                data: res.data,
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
            let response = [
                { area: "Tecnologia", id: 1, data: "2025-10-01" },
                { area: "Agronomiaa", id: 2, data: "2025-10-01" },
                { area: "Cultura", id: 3, data: "2025-10-01" },
            ];

            if (!id) {
                response = [
                    { area: "Tecnologia", id: 1, data: "2025-10-01" },
                    { area: "Agronomiaa", id: 2, data: "2025-10-01" },
                    { area: "Cultura", id: 3, data: "2025-10-01" },
                ];
            } else {
                response = response[id-1];
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
