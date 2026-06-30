const FuncionarioService = require("../services/FuncionarioService");

class FuncionarioController {
    static async listar(req, res, next) {
        try {
            const funcionarios = await FuncionarioService.listar();

            return res.status(200).json({
                success: true,
                message: "Funcionários listados com sucesso.",
                data: funcionarios
            });

        } catch (error) {
            next(error);
        }
    }

    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;

            const funcionario = await FuncionarioService.buscarPorId(id);

            return res.status(200).json({
                success: true,
                message: "Funcionário encontrado com sucesso.",
                data: funcionario
            });

        } catch (error) {
            next(error);
        }
    }

    static async cadastrar(req, res, next) {
        try {
            const funcionario = await FuncionarioService.cadastrar(req.body);

            return res.status(201).json({
                success: true,
                message: "Funcionário cadastrado com sucesso.",
                data: funcionario
            });

        } catch (error) {
            next(error);
        }
    }

    static async editar(req, res, next) {
        try {
            const { id } = req.params;

            const funcionario = await FuncionarioService.editar(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Funcionário atualizado com sucesso.",
                data: funcionario
            });

        } catch (error) {
            next(error);
        }
    }

    static async excluir(req, res, next) {
        try {
            const { id } = req.params;

            await FuncionarioService.excluir(id);

            return res.status(200).json({
                success: true,
                message: "Funcionário excluído com sucesso."
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = FuncionarioController;
