const pool = require("../database/connection");

class Dashboard {

    static async getResumo() {
        const result = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM cidade) AS "totalCidades",
            (SELECT COUNT(*) FROM funcionario) AS "totalFuncionarios",
            (SELECT COUNT(*) FROM equipamento) AS "totalEquipamentos",
            (SELECT COUNT(*) FROM servico) AS "totalServicos"
    `);

        return result.rows[0];
    }

}

module.exports = Dashboard;
