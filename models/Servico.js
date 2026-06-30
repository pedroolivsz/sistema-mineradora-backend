const pool = require("../database/connection");

class Servico {
    static async findAll() {
        const sql = `
        SELECT
            id,
            nome,
            descricao,
            data_inicio,
            data_fim,
            valor
        FROM servico
        ORDER BY nome;
    `;

        const { rows } = await pool.query(sql);

        return rows;
    }

    static async findById(id) {
        const client = await pool.connect();

        try {
            const servicoResult = await client.query(
                `
            SELECT
                id,
                nome,
                descricao,
                data_inicio,
                data_fim,
                valor
            FROM servico
            WHERE id = $1;
            `,
                [id]
            );

            if (servicoResult.rows.length === 0) {
                return null;
            }

            const equipamentosResult = await client.query(
                `
            SELECT
                e.id,
                e.nome
            FROM servico_equipamento se
            INNER JOIN equipamento e
                ON e.id = se.equipamento_id
            WHERE se.servico_id = $1
            ORDER BY e.nome;
            `,
                [id]
            );

            const servico = servicoResult.rows[0];

            servico.equipamentos = equipamentosResult.rows;

            return servico;

        } finally {
            client.release();
        }
    }

    static async create(servico) {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const result = await client.query(
                `
            INSERT INTO servico (
                nome,
                descricao,
                data_inicio,
                data_fim,
                valor
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
            `,
                [
                    servico.nome,
                    servico.descricao,
                    servico.data_inicio,
                    servico.data_fim,
                    servico.valor
                ]
            );

            const novoServico = result.rows[0];

            for (const equipamentoId of servico.equipamentos) {
                await client.query(
                    `
                INSERT INTO servico_equipamento (
                    servico_id,
                    equipamento_id
                )
                VALUES ($1, $2);
                `,
                    [novoServico.id, equipamentoId]
                );
            }

            await client.query("COMMIT");

            return novoServico;

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    static async update(id, servico) {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const result = await client.query(
                `
            UPDATE servico
            SET
                nome = $1,
                descricao = $2,
                data_inicio = $3,
                data_fim = $4,
                valor = $5
            WHERE id = $6
            RETURNING *;
            `,
                [
                    servico.nome,
                    servico.descricao,
                    servico.data_inicio,
                    servico.data_fim,
                    servico.valor,
                    id
                ]
            );

            await client.query(
                `
            DELETE FROM servico_equipamento
            WHERE servico_id = $1;
            `,
                [id]
            );

            for (const equipamentoId of servico.equipamentos) {
                await client.query(
                    `
                INSERT INTO servico_equipamento (
                    servico_id,
                    equipamento_id
                )
                VALUES ($1, $2);
                `,
                    [id, equipamentoId]
                );
            }

            await client.query("COMMIT");

            return result.rows[0];

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    static async delete(id) {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            await client.query(
                `
            DELETE FROM servico_equipamento
            WHERE servico_id = $1;
            `,
                [id]
            );

            const result = await client.query(
                `
            DELETE FROM servico
            WHERE id = $1
            RETURNING *;
            `,
                [id]
            );

            await client.query("COMMIT");

            return result.rows[0];

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = Servico;
