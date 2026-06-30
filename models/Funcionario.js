const pool = require("../database/connection");

class Funcionario {
    static async findAll() {
        const sql = `
        SELECT
            f.id,
            f.nome,
            f.cargo,
            f.telefone,
            f.email,
            f.salario,
            f.cidade_id,
            c.nome AS cidade_nome
        FROM funcionario f
        INNER JOIN cidade c
            ON c.id = f.cidade_id
        ORDER BY f.nome;
    `;

        const { rows } = await pool.query(sql);

        return rows;
    }

    static async findById(id) {
        const sql = `
        SELECT
            f.id,
            f.nome,
            f.cargo,
            f.telefone,
            f.email,
            f.salario,
            f.cidade_id,
            c.nome AS cidade_nome
        FROM funcionario f
        INNER JOIN cidade c
            ON c.id = f.cidade_id
        WHERE f.id = $1;
    `;

        const { rows } = await pool.query(sql, [id]);

        return rows[0];
    }

    static async create(funcionario) {
        const sql = `
        INSERT INTO funcionario (
            nome,
            cargo,
            telefone,
            email,
            salario,
            cidade_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

        const values = [
            funcionario.nome,
            funcionario.cargo,
            funcionario.telefone,
            funcionario.email,
            funcionario.salario,
            funcionario.cidade_id
        ];

        const { rows } = await pool.query(sql, values);

        return rows[0];
    }

    static async update(id, funcionario) {
        const sql = `
        UPDATE funcionario
        SET
            nome = $1,
            cargo = $2,
            telefone = $3,
            email = $4,
            salario = $5,
            cidade_id = $6
        WHERE id = $7
        RETURNING *;
    `;

        const values = [
            funcionario.nome,
            funcionario.cargo,
            funcionario.telefone,
            funcionario.email,
            funcionario.salario,
            funcionario.cidade_id,
            id
        ];

        const { rows } = await pool.query(sql, values);

        return rows[0];
    }

    static async delete(id) {
        const sql = `
        DELETE FROM funcionario
        WHERE id = $1
        RETURNING *;
    `;

        const { rows } = await pool.query(sql, [id]);

        return rows[0];
    }
}

module.exports = Funcionario;