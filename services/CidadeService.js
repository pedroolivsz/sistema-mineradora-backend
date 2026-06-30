const Cidade = require("../models/Cidade");

class CidadeService {
    static async listar() {
        return await Cidade.findAll();
    }

    static async buscarPorId(id) {
        const cidade = await Cidade.findById(id);

        if (!cidade) {
            throw new Error("Cidade não encontrada.");
        }

        return cidade;
    }

    static async cadastrar(dados) {
        const { nome, estado, populacao } = dados;

        if (!nome || !estado || populacao === undefined) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        if (estado.length !== 2) {
            throw new Error("O estado deve possuir 2 caracteres.");
        }

        if (Number(populacao) < 0) {
            throw new Error("A população deve ser maior ou igual a zero.");
        }

        return await Cidade.create(dados);
    }

    static async editar(id, dados) {
        await this.buscarPorId(id);

        const { nome, estado, populacao } = dados;

        if (!nome || !estado || populacao === undefined) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        if (estado.length !== 2) {
            throw new Error("O estado deve possuir 2 caracteres.");
        }

        if (Number(populacao) < 0) {
            throw new Error("A população deve ser maior ou igual a zero.");
        }

        return await Cidade.update(id, dados);
    }

    static async excluir(id) {
        await this.buscarPorId(id);

        return await Cidade.delete(id);
    }
}

module.exports = CidadeService;
