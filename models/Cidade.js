const pool = require("../database/connection");

class Cidade {
    static async findAll() {
        const sql = `
        SELECT
            id,
            nome,
            estado,
            populacao
        FROM cidade
        ORDER BY nome;
    `;

        const { rows } = await pool.query(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `
        SELECT
            id,
            nome,
            estado,
            populacao
        FROM cidade
        WHERE id = $1;
    `;

        const { rows } = await pool.query(sql, [id]);

        return rows[0];
    }

    static async create(cidade) {
        const sql = `
        INSERT INTO cidade (
            nome,
            estado,
            populacao
        )
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

        const values = [
            cidade.nome,
            cidade.estado,
            cidade.populacao
        ];

        const { rows } = await pool.query(sql, values);

        return rows[0];
    }

    static async update(id, cidade) {
        const sql = `
        UPDATE cidade
        SET
            nome = $1,
            estado = $2,
            populacao = $3
        WHERE id = $4
        RETURNING *;
    `;

        const values = [
            cidade.nome,
            cidade.estado,
            cidade.populacao,
            id
        ];

        const { rows } = await pool.query(sql, values);

        return rows[0];
    }

    static async delete(id) {
        const sql = `
        DELETE FROM cidade
        WHERE id = $1
        RETURNING *;
    `;

        const { rows } = await pool.query(sql, [id]);

        return rows[0];
    }
}

module.exports = Cidade;
