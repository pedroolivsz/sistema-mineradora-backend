const Equipamento = require("../models/Equipamento");
const Cidade = require("../models/Cidade");

class EquipamentoService {
    static async listar() {
        return await Equipamento.findAll();
    }

    static async buscarPorId(id) {
        const equipamento = await Equipamento.findById(id);

        if (!equipamento) {
            const error = new Error("Equipamento não encontrado.");
            error.status = 404;
            throw error;
        }

        return equipamento;
    }

    static async cadastrar(dados) {
        const {
            nome,
            modelo,
            fabricante,
            data_aquisicao,
            status,
            cidade_id
        } = dados;

        if (
            !nome ||
            !modelo ||
            !fabricante ||
            !data_aquisicao ||
            !status ||
            !cidade_id
        ) {
            const error = new Error("Todos os campos são obrigatórios.");
            error.status = 400;
            throw error;
        }

        const statusValidos = [
            "ATIVO",
            "MANUTENCAO",
            "INATIVO"
        ];

        if (!statusValidos.includes(status)) {
            const error = new Error("Status inválido.");
            error.status = 400;
            throw error;
        }

        if (isNaN(Date.parse(data_aquisicao))) {
            const error = new Error("Data de aquisição inválida.");
            error.status = 400;
            throw error;
        }

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            const error = new Error("Cidade não encontrada.");
            error.status = 404;
            throw error;
        }

        return await Equipamento.create(dados);
    }

    static async editar(id, dados) {
        await this.buscarPorId(id);

        const {
            nome,
            modelo,
            fabricante,
            data_aquisicao,
            status,
            cidade_id
        } = dados;

        if (
            !nome ||
            !modelo ||
            !fabricante ||
            !data_aquisicao ||
            !status ||
            !cidade_id
        ) {
            const error = new Error("Todos os campos são obrigatórios.");
            error.status = 400;
            throw error;
        }

        const statusValidos = [
            "ATIVO",
            "MANUTENCAO",
            "INATIVO"
        ];

        if (!statusValidos.includes(status)) {
            const error = new Error("Status inválido.");
            error.status = 400;
            throw error;
        }

        if (isNaN(Date.parse(data_aquisicao))) {
            const error = new Error("Data de aquisição inválida.");
            error.status = 400;
            throw error;
        }

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            const error = new Error("Cidade não encontrada.");
            error.status = 404;
            throw error;
        }

        return await Equipamento.update(id, dados);
    }

    static async excluir(id) {
        await this.buscarPorId(id);

        return await Equipamento.delete(id);
    }
}

module.exports = EquipamentoService;
