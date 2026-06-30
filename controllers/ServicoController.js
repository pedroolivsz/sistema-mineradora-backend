const ServicoService = require("../services/ServicoService");

class ServicoController {
    static async listar(req, res) {
        try {
            const servicos = await ServicoService.listar();

            return res.status(200).json({
                success: true,
                message: "Serviços listados com sucesso.",
                data: servicos
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

            const servico = await ServicoService.buscarPorId(id);

            return res.status(200).json({
                success: true,
                message: "Serviço encontrado com sucesso.",
                data: servico
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
            const servico = await ServicoService.cadastrar(req.body);

            return res.status(201).json({
                success: true,
                message: "Serviço cadastrado com sucesso.",
                data: servico
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

            const servico = await ServicoService.editar(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Serviço atualizado com sucesso.",
                data: servico
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

            await ServicoService.excluir(id);

            return res.status(200).json({
                success: true,
                message: "Serviço excluído com sucesso."
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ServicoController;
