const pool = require("../database/connection");

class Equipamento {
    static async findAll() {
        const sql = `
        SELECT
            e.id,
            e.nome,
            e.modelo,
            e.fabricante,
            e.data_aquisicao,
            e.status,
            e.cidade_id,
            c.nome AS cidade_nome
        FROM equipamento e
        INNER JOIN cidade c
            ON c.id = e.cidade_id
        ORDER BY e.nome;
    `;

        const { rows } = await pool.query(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `
        SELECT
            e.id,
            e.nome,
            e.modelo,
            e.fabricante,
            e.data_aquisicao,
            e.status,
            e.cidade_id,
            c.nome AS cidade_nome
        FROM equipamento e
        INNER JOIN cidade c
            ON c.id = e.cidade_id
        WHERE e.id = $1;
    `;

        const { rows } = await pool.query(sql, [id]);

        return rows[0];
    }

    static async create(equipamento) {
        const sql = `
        INSERT INTO equipamento (
            nome,
            modelo,
            fabricante,
            data_aquisicao,
            status,
            cidade_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

        const values = [
            equipamento.nome,
            equipamento.modelo,
            equipamento.fabricante,
            equipamento.data_aquisicao,
            equipamento.status,
            equipamento.cidade_id
        ];

        const { rows } = await pool.query(sql, values);

        return rows[0];
    }

    static async update(id, equipamento) {
        const sql = `
        UPDATE equipamento
        SET
            nome = $1,
            modelo = $2,
            fabricante = $3,
            data_aquisicao = $4,
            status = $5,
            cidade_id = $6
        WHERE id = $7
        RETURNING *;
    `;

        const values = [
            equipamento.nome,
            equipamento.modelo,
            equipamento.fabricante,
            equipamento.data_aquisicao,
            equipamento.status,
            equipamento.cidade_id,
            id
        ];

        const { rows } = await pool.query(sql, values);

        return rows[0];
    }

    static async delete(id) {
        const sql = `
        DELETE FROM equipamento
        WHERE id = $1
        RETURNING *;
    `;

        const { rows } = await pool.query(sql, [id]);

        return rows[0];
    }

}

module.exports = Equipamento;
