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
            const requestData = {
                id: "abc123",
                usuario: {
                    nome: "Américo Malungo",
                    idade: 24,
                    genero: "masculino",
                },

                contactos: {
                    email: "americo@example.com",
                    telefone: "+244900000000",
                },

                nivel_educacao: "Licenciatura",
                interesse: "Desenvolvimento Web",
                regiao: "Luanda",
            };
            console.log("Pros....");
            /*
            const response = await axios.post(
                "https://webdevs04.app.n8n.cloud/webhook/f0f7606a-370a-48f4-b1d0-58d6f34f9fe3",
                requestData
                //{ timeout: 240000 } // 60 segundos
            );

            if (response.data) {
                console.log("Ok");
            } else {
                console.log("None");
            }*/
            const recomendacaoCriada = await iteracoes_model.create({
                id_candidato: user.id,
                titulo: formData.interesse,
                recomendacao: recomendacoes,
            });

            return {
                success: true,
                message: "Recomendações curriculares!",
                //data: response.data,
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
