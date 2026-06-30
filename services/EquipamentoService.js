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
