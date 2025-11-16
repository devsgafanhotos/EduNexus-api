/**
 * @description IMPORTAÇÃO DO MODULO DE SERVIÇOS DE agentss
 */
const { agentsServices } = require("../services");

class agentsControllers {
    novasRecomendacoes = async (req, res) => {
        try {
            const data = req.body;
            const response = await agentsServices.novasRecomendacoes(data);

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
            console.log(
                `\n\nErro interno ao buscar recomendações... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao buscar recomendações",
                errors: `${error}`,
            });
        }
    };

    buscarRecomendacoes = async (req, res) => {
        try {
            const { r } = req.query;

            const response = await agentsServices.buscarRecomendacoes(r);

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
            console.log(
                `\n\nErro interno ao buscar recomendações... ${error}.\n`
            );
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao buscar recomendações",
                errors: `${error}`,
            });
        }
    };

    buscarEmpregos = async (req, res) => {
        try {
            const response = await agentsServices.buscarEmpregos();

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
            console.log(`\n\nErro interno ao buscar empregos... ${error}.\n`);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Erro ao buscar empregos",
                errors: `${error}`,
            });
        }
    };
}

module.exports = new agentsControllers();
