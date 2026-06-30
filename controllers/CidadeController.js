const CidadeService = require("../services/CidadeService");

class CidadeController {
    static async listar(req, res) {
        try {
            const cidades = await CidadeService.listar();

            return res.status(200).json({
                success: true,
                message: "Cidades listadas com sucesso.",
                data: cidades
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const cidade = await CidadeService.buscarPorId(id);

            return res.status(200).json({
                success: true,
                message: "Cidade encontrada com sucesso.",
                data: cidade
            });

        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    static async cadastrar(req, res) {
        try {
            const cidade = await CidadeService.cadastrar(req.body);

            return res.status(201).json({
                success: true,
                message: "Cidade cadastrada com sucesso.",
                data: cidade
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async editar(req, res) {
        try {
            const { id } = req.params;

            const cidade = await CidadeService.editar(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Cidade atualizada com sucesso.",
                data: cidade
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;

            await CidadeService.excluir(id);

            return res.status(200).json({
                success: true,
                message: "Cidade excluída com sucesso."
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = CidadeController;
