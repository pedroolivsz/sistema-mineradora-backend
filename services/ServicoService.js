const Servico = require("../models/Servico");
const Equipamento = require("../models/Equipamento");

class ServicoService {
    static async listar() {
        return await Servico.findAll();
    }

    static async buscarPorId(id) {
        const servico = await Servico.findById(id);

        if (!servico) {
            const error = new Error("Serviço não encontrado.");
            error.status = 404;
            throw error;
        }

        return servico;
    }

    static async cadastrar(dados) {
        const {
            nome,
            descricao,
            data_inicio,
            data_fim,
            valor,
            equipamentos
        } = dados;

        for (const equipamentoId of equipamentos) {
            const equipamento = await Equipamento.findById(equipamentoId);

            if (!equipamento) {
                const error = new Error(
                    `Equipamento ${equipamentoId} não encontrado.`
                );
                error.status = 404;
                throw error;
            }
        }

        return await Servico.create(dados);
    }

    static async editar(id, dados) {
        await this.buscarPorId(id);

        const {
            nome,
            descricao,
            data_inicio,
            data_fim,
            valor,
            equipamentos
        } = dados;

        for (const equipamentoId of equipamentos) {
            const equipamento = await Equipamento.findById(equipamentoId);

            if (!equipamento) {
                const error = new Error(
                    `Equipamento ${equipamentoId} não encontrado.`
                );
                error.status = 400;
                throw error;
            }
        }

        return await Servico.update(id, dados);
    }

    static async excluir(id) {
        await this.buscarPorId(id);

        return await Servico.delete(id);
    }
}

module.exports = ServicoService;
