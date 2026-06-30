const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

pool.on("connect", () => {
    console.log("Conectado ao PostgreSQL.");
});

pool.on("error", (error) => {
    console.error("Erro no pool de conexões:", error);
});

module.exports = pool;