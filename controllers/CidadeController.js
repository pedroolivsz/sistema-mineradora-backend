const CidadeService = require("../services/CidadeService");

class CidadeController {
    static async listar(req, res, next) {
        try {
            const cidades = await CidadeService.listar();

            return res.status(200).json({
                success: true,
                message: "Cidades listadas com sucesso.",
                data: cidades
            });

        } catch (error) {
            next(error);
        }
    }

    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;

            const cidade = await CidadeService.buscarPorId(id);

            return res.status(200).json({
                success: true,
                message: "Cidade encontrada com sucesso.",
                data: cidade
            });

        } catch (error) {
            next(error);
        }
    }

    static async cadastrar(req, res, next) {
        try {
            const cidade = await CidadeService.cadastrar(req.body);

            return res.status(201).json({
                success: true,
                message: "Cidade cadastrada com sucesso.",
                data: cidade
            });

        } catch (error) {
            next(error);
        }
    }

    static async editar(req, res, next) {
        try {
            const { id } = req.params;

            const cidade = await CidadeService.editar(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Cidade atualizada com sucesso.",
                data: cidade
            });

        } catch (error) {
            next(error);
        }
    }

    static async excluir(req, res, next) {
        try {
            const { id } = req.params;

            await CidadeService.excluir(id);

            return res.status(200).json({
                success: true,
                message: "Cidade excluída com sucesso."
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = CidadeController;
