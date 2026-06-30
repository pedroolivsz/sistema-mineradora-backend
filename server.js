require("dotenv").config();

const express = require("express");
const cors = require("./config/cors");
const pool = require("./database/connection");

const app = express();

app.use(cors);
app.use(express.json());

app.get("/", (request, response) => {
    response.status(200).json({
        sucess: true,
        message: "API do Sistema de Gestão para Empresas de Mineraação"
    });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await pool.query("SELECT NOW()");
        console.log("Banco de dados conectado com sucesso.");

        app.listen(PORT, () => {
            console.log(`Servidor iniciado na porta ${PORT}`);
        });
    } catch(error) {
        console.error("Erro ao conectar ao banco", error);
        process.exit(1);
    }
}

iniciarServidor();