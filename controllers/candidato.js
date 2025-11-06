/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE candidatos
 */
const { candidatoServices } = require("../services");

class candidatoControllers {
    /**
     * @description Insere um novo registro de candidato
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    cadastrarCandidato = async (req, res) => {
        try {
            const { body } = req;

            const response = await candidatoServices.createCandidato(body);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );
                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(201).json({
                status: 201,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(
                `\n\nErro interno ao cadastrar candidato... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar candidato",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Insere um novo registro de candidato
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    loginCandidato = async (req, res) => {
        try {
            const { body } = req;

            const response = await candidatoServices.loginCandidato(body, res);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );
                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(response.status).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(
                `\n\nErro interno ao cadastrar candidato... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao cadastrar candidato",
                errors: `${error}`,
            });
        }
    };

    /**
     * @description Insere um novo registro de candidato
     * @param {Request} req - Objecto que contem a requisição e os elementos que ela traz.
     * @param {Response} res - Objecto que controla a resposta.
     * @returns {{
     *      status: Number,
     *      success: Boolean,
     *      message: String,
     *      data: JSON,
     *      errors: undefined
     * }} - Objecto de resposta contendo o novo candidato criado(em caso de sucesso), ou mensagens de erro em caso de insucesso. O código de status da requisição...
     */
    logoutCandidato = async (req, res) => {
        try {
            const response = await candidatoServices.logoutCandidato(req, res);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                console.log(`\n\n${response.message}... ${response.errors}.\n`);
                return res.status(500).json({
                    status: 500,
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao efeituar logout... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao efeituar logout",
                errors: `${error}`,
            });
        }
    };

    perfilCandidato = async (req, res) => {
        try {
            const { id = 0 } = req.params;

            const response = await candidatoServices.getCandidato(id);

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );

                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }

                // Se não tiver é porque o erro é do lado do cliente {Conflito de dados ou Chave enviada inexistente}
                return res.status(404).json({
                    ...response,
                });
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao buscar candidato... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar candidato",
                errors: `${error}`,
            });
        }
    };

    listarCandidatos = async (req, res) => {
        try {
            const response = await candidatoServices.getCandidatos();

            // Em caso de insucesso
            if (!response.success) {
                // Se tiver informações de erro é porque o erro é interno: 500
                if (response.errors) {
                    console.log(
                        `\n\n${response.message}... ${response.errors}.\n`
                    );

                    return res.status(500).json({
                        status: 500,
                        ...response,
                    });
                }
            }

            // Se chegamos até aqui é porque tudo tá OK
            return res.status(200).json({
                status: 200,
                ...response,
            });
        } catch (error) {
            // Em caso de um outro erro inesperado tratamos aqui.
            console.log(`\n\nErro interno ao buscar candidato... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro interno ao buscar candidato",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new candidatoControllers();
