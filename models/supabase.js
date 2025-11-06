/*
const supabase = require("./supabaseClient");

// CREATE: Adicionar um novo produto
async (req, res) => {
    const { nome, preco } = req.body;
    const { data, error } = await supabase
        .from("produtos")
        .insert([{ nome, preco }]);

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
};

// READ: Listar todos os produtos
async (req, res) => {
    const { data, error } = await supabase.from("produtos").select("*");

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
};

// UPDATE: Atualizar um produto
async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const { data, error } = await supabase
        .from("produtos")
        .update({ nome, preco })
        .eq("id", id);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
};

// DELETE: Remover um produto
async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("produtos")
        .delete()
        .eq("id", id);

    if (error) return res.status(500).json({ error: error.message });
    res.status(204).end();
};

const supabase = require("./config/supabaseClient");
app.get("/", async (req, res) => {
    const data = await supabase.from("trabalhos").select("*");

    //if (error) return res.status(500).json({ error: error.message });

    const dataC = await supabase.from("usuarios").insert([
        {
            email: "Hemail",
            nome: "Hermenegildo",
            localizacao: "Uíge",
            competencias: "Jogar bola",
        },
    ]);

    //if (error2) return res.status(500).json({ error: error.message });

    console.log(data, dataC);
    res.json({ data: data });
});
*/

const models = require("../config/mysqlClient").conectModels();

const candidato_model = {
    async create(data) {
        const res = await models.candidato.create(data);
        return res;
    },

    async select(condition) {
        const candidatos_encontrados = await models.candidato.findAll({
            where: condition,
            row: true,
        });

        return candidatos_encontrados;
    },
    async selectOne(condition) {
        const candidatos_encontrados = await models.candidato.findOne({
            where: condition,
            row: true,
        });

        return candidatos_encontrados;
    },
    update(data) {
        return "update";
    },
    delete(id) {
        return "delete";
    },
};

const token_model = {
    async create(data) {
        const res = await models.token.create(data);
        return res;
    },

    async select(condition) {
        const token_encontrado = await models.token.findAll({
            where: condition,
            row: true,
        });

        return token_encontrado;
    },
    async selectOne(condition) {
        const token_encontrado = await models.token.findOne({
            where: condition,
            row: true,
        });

        return token_encontrado;
    },
    update(data) {
        return "update";
    },
    async delete(condition) {
        try {
            const token_deletado = await models.token.destroy({
            where: {condition},
            row: true,
        });

        return token_deletado;
        } catch (error) {
            console.log(`\n\nErro interno ao efeituar logout... ${error}.\n`);
            
            return {
                success: false,
                message: "Erro ao fazer logout",
                errors: `${error}`,
            };
        }
    },
};

module.exports = { candidato_model, token_model };
