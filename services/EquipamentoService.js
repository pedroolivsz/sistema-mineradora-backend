const Equipamento = require("../models/Equipamento");
const Cidade = require("../models/Cidade");

class EquipamentoService {
    static async listar() {
        return await Equipamento.findAll();
    }

    static async buscarPorId(id) {
        const equipamento = await Equipamento.findById(id);

        if (!equipamento) {
            throw new Error("Equipamento não encontrado.");
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
            throw new Error("Todos os campos são obrigatórios.");
        }

        const statusValidos = [
            "ATIVO",
            "MANUTENCAO",
            "INATIVO"
        ];

        if (!statusValidos.includes(status)) {
            throw new Error("Status inválido.");
        }

        if (isNaN(Date.parse(data_aquisicao))) {
            throw new Error("Data de aquisição inválida.");
        }

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            throw new Error("Cidade não encontrada.");
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
            throw new Error("Todos os campos são obrigatórios.");
        }

        const statusValidos = [
            "ATIVO",
            "MANUTENCAO",
            "INATIVO"
        ];

        if (!statusValidos.includes(status)) {
            throw new Error("Status inválido.");
        }

        if (isNaN(Date.parse(data_aquisicao))) {
            throw new Error("Data de aquisição inválida.");
        }

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            throw new Error("Cidade não encontrada.");
        }

        return await Equipamento.update(id, dados);
    }

    static async excluir(id) {
        await this.buscarPorId(id);

        return await Equipamento.delete(id);
    }
}

module.exports = EquipamentoService;
