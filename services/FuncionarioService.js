const Funcionario = require("../models/Funcionario");
const Cidade = require("../models/Cidade");

class FuncionarioService {
    static async listar() {
        return await Funcionario.findAll();
    }

    static async buscarPorId(id) {
        const funcionario = await Funcionario.findById(id);

        if (!funcionario) {
            throw new Error("Funcionário não encontrado.");
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

        if (
            !nome ||
            !cargo ||
            !telefone ||
            !email ||
            salario === undefined ||
            !cidade_id
        ) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error("E-mail inválido.");
        }

        if (Number(salario) < 0) {
            throw new Error("O salário deve ser maior ou igual a zero.");
        }

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            throw new Error("Cidade não encontrada.");
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

        if (
            !nome ||
            !cargo ||
            !telefone ||
            !email ||
            salario === undefined ||
            !cidade_id
        ) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error("E-mail inválido.");
        }

        if (Number(salario) < 0) {
            throw new Error("O salário deve ser maior ou igual a zero.");
        }

        const cidade = await Cidade.findById(cidade_id);

        if (!cidade) {
            throw new Error("Cidade não encontrada.");
        }

        return await Funcionario.update(id, dados);
    }

    static async excluir(id) {
        await this.buscarPorId(id);

        return await Funcionario.delete(id);
    }
}

module.exports = FuncionarioService;
