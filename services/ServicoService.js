const Servico = require("../models/Servico");
const Equipamento = require("../models/Equipamento");

class ServicoService {
    static async listar() {
        return await Servico.findAll();
    }

    static async buscarPorId(id) {
        const servico = await Servico.findById(id);

        if (!servico) {
            throw new Error("Serviço não encontrado.");
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
            throw new Error("Todos os campos são obrigatórios.");
        }

        if (equipamentos.length === 0) {
            throw new Error("Informe pelo menos um equipamento.");
        }

        if (isNaN(Date.parse(data_inicio))) {
            throw new Error("Data de início inválida.");
        }

        if (isNaN(Date.parse(data_fim))) {
            throw new Error("Data de fim inválida.");
        }

        if (new Date(data_fim) < new Date(data_inicio)) {
            throw new Error("A data de fim deve ser maior ou igual à data de início.");
        }

        if (Number(valor) < 0) {
            throw new Error("O valor deve ser maior ou igual a zero.");
        }

        for (const equipamentoId of equipamentos) {
            const equipamento = await Equipamento.findById(equipamentoId);

            if (!equipamento) {
                throw new Error(
                    `Equipamento ${equipamentoId} não encontrado.`
                );
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
            throw new Error("Todos os campos são obrigatórios.");
        }

        if (equipamentos.length === 0) {
            throw new Error("Informe pelo menos um equipamento.");
        }

        if (isNaN(Date.parse(data_inicio))) {
            throw new Error("Data de início inválida.");
        }

        if (isNaN(Date.parse(data_fim))) {
            throw new Error("Data de fim inválida.");
        }

        if (new Date(data_fim) < new Date(data_inicio)) {
            throw new Error("A data de fim deve ser maior ou igual à data de início.");
        }

        if (Number(valor) < 0) {
            throw new Error("O valor deve ser maior ou igual a zero.");
        }

        for (const equipamentoId of equipamentos) {
            const equipamento = await Equipamento.findById(equipamentoId);

            if (!equipamento) {
                throw new Error(
                    `Equipamento ${equipamentoId} não encontrado.`
                );
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
