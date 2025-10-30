/**
 * @description IMPORTAÇÃO DO MODULO PRINCIPAL
 */
const express = require("express");
const app = express();

/**
 * @description INJEÇÃO DAS VARIAVEIS DE ABIENTE
 */
const dotenv = require("dotenv");
dotenv.config();

/**
 * @description CONFIGURAMOS O CORS PARA QUE O SERVIDOR ACEITE REQUISIÇÕES DE OUTOS DOMÍNEOS
 */
const cors = require("cors");
app.use(cors());

/**
 * @description CONECTANDO-SE AO BANCO DE DADOS

const database = require("./config/database");
database.conectDB();
 */

/**
 * @description FAZEMOS COM QUE A APP POSSA TRABALHAR COM COOKIES
 */
const cookieParser = require("cookie-parser");
app.use(cookieParser());

/**
 * @description FAZEMOS COM QUE A APP POSSA TRAFEGAR OBJETOS JSON's ENTRE AS REQUISIÇÕES
 */
app.use(express.json());

/**
 * @description INTEGRAMOS O OBJECTO QUE CONTROLA AS ROTAS
 
const { router } = require("./routes");
app.use(router);
*/
const supabase = require("./config/supabaseClient");
app.get("/", async (req, res) => {
    const data = await supabase.from("trabalhos").select("*");

    //if (error) return res.status(500).json({ error: error.message });

    const dataC= await supabase
        .from("usuarios")
        .insert([
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

/**
 *@description COLOCANDO O SERVIDOR PARA RODAR
 */
app.listen(3000, (error) => {
    if (error) {
        return console.log(`Erro ao rodar o servidor... ${error}`);
    }
    console.log(
        `\nServidor rodando em: http://localhost:${process.env.SERVER_PORT}`
    );
});
