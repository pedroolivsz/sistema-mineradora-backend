const Cidade = require("../models/Cidade");

class CidadeService {
    static async listar() {
        return await Cidade.findAll();
    }

    static async buscarPorId(id) {
        const cidade = await Cidade.findById(id);

        if (!cidade) {
            const error = new Error("Cidade não encontrada.");
            error.status = 404;
            throw error;
        }

        return cidade;
    }

    static async cadastrar(dados) {
        const { nome, estado, populacao } = dados;

        if (!nome || !estado || populacao === undefined) {
            const error = new Error("Todos os campos são obrigatórios.");
            error.status = 400;
            throw error;
        }

        if (estado.length !== 2) {
            const error = new Error("O estado deve possuir 2 caracteres.");
            error.status = 400;
            throw error;
        }

        if (Number(populacao) < 0) {
            const error = new Error("A população deve ser maior ou igual a zero.");
            error.status = 400;
            throw error;
        }

        return await Cidade.create(dados);
    }

    static async editar(id, dados) {
        await this.buscarPorId(id);

        const { nome, estado, populacao } = dados;

        if (!nome || !estado || populacao === undefined) {
            const error = new Error("Todos os campos são obrigatórios.");
            error.status = 400;
            throw error;
        }

        if (estado.length !== 2) {
            const error = new Error("O estado deve possuir 2 caracteres.");
            error.status = 400;
            throw error;
        }

        if (Number(populacao) < 0) {
            const error = new Error("A população deve ser maior ou igual a zero.");
            error.status = 400;
            throw error;
        }

        return await Cidade.update(id, dados);
    }

    static async excluir(id) {
        await this.buscarPorId(id);

        return await Cidade.delete(id);
    }
}

module.exports = CidadeService;
