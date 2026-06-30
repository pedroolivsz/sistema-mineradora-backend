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

        if (
            !nome ||
            !descricao ||
            !data_inicio ||
            !data_fim ||
            valor === undefined ||
            !Array.isArray(equipamentos)
        ) {
            const error = new Error("Todos os campos são obrigatórios.");
            error.status = 400;
            throw error;
        }

        if (equipamentos.length === 0) {
            const error = new Error("Informe pelo menos um equipamento.");
            error.status = 400;
            throw error;
        }

        if (isNaN(Date.parse(data_inicio))) {
            const error = new Error("Data de início inválida.");
            error.status = 400;
            throw error;
        }

        if (isNaN(Date.parse(data_fim))) {
            const error = new Error("Data de fim inválida.");
            error.status = 400;
            throw error;
        }

        if (new Date(data_fim) < new Date(data_inicio)) {
            const error = new Error("A data de fim deve ser maior ou igual à data de início.");
            error.status = 400;
            throw error;
        }

        if (Number(valor) < 0) {
            const error = new Error("O valor deve ser maior ou igual a zero.");
            error.status = 400;
            throw error;
        }

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

        if (
            !nome ||
            !descricao ||
            !data_inicio ||
            !data_fim ||
            valor === undefined ||
            !Array.isArray(equipamentos)
        ) {
            const error = new Error("Todos os campos são obrigatórios.");
            error.status = 400;
            throw error;
        }

        if (equipamentos.length === 0) {
            const error = new Error("Informe pelo menos um equipamento.");
            error.status = 400;
            throw error;
        }

        if (isNaN(Date.parse(data_inicio))) {
            const error = new Error("Data de início inválida.");
            error.status = 400;
            throw error;
        }

        if (isNaN(Date.parse(data_fim))) {
            const error = new Error("Data de fim inválida.");
            error.status = 400;
            throw error;
        }

        if (new Date(data_fim) < new Date(data_inicio)) {
            const error = new Error("A data de fim deve ser maior ou igual à data de início.");
            error.status = 400;
            throw error;
        }

        if (Number(valor) < 0) {
            const error = new Error("O valor deve ser maior ou igual a zero.");
            error.status = 400;
            throw error;
        }

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
