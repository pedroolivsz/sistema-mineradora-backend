const Funcionario = require("../models/Funcionario");
const Cidade = require("../models/Cidade");

class FuncionarioService {
    static async listar() {
        return await Funcionario.findAll();
    }

    static async buscarPorId(id) {
        const funcionario = await Funcionario.findById(id);

        if (!funcionario) {
            const error = new Error("Funcionário não encontrado.");
            error.status = 404;
            throw error;
        }

        return funcionario;
    }

    static async cadastrar(dados) {
        const {
            nome,
            cargo,
            telefone,
            email,
            salario,
            cidade_id
        } = dados;

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            const error = new Error("Cidade não encontrada.");
            error.status = 404;
            throw error;
        }

        return await Funcionario.create(dados);
    }

    static async editar(id, dados) {
        await this.buscarPorId(id);

        const {
            nome,
            cargo,
            telefone,
            email,
            salario,
            cidade_id
        } = dados;

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            const error = new Error("Cidade não encontrada.");
            error.status = 404;
            throw error;
        }

        return await Funcionario.update(id, dados);
    }

    static async excluir(id) {
        await this.buscarPorId(id);

        return await Funcionario.delete(id);
    }
}

module.exports = FuncionarioService;
