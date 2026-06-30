require("dotenv").config();

const express = require("express");
const cors = require("./config/cors");

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

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});