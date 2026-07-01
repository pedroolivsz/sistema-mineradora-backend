const { Pool } = require("pg");

console.log("DATABASE_URL definida?", !!process.env.DATABASE_URL);
console.log(
  "Host:",
  process.env.DATABASE_URL?.match(/@([^:/]+)/)?.[1]
);
console.log(
  "Porta:",
  process.env.DATABASE_URL?.match(/:(\d+)\//)?.[1]
);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connect", () => {
    console.log("Conectado ao PostgreSQL.");
});

pool.on("error", (error) => {
    console.error("Erro no pool de conexões:", error);
});

module.exports = pool;