const EquipamentoService = require("../services/EquipamentoService");

class EquipamentoController {
    static async listar(req, res) {
        try {
            const equipamentos = await EquipamentoService.listar();

            return res.status(200).json({
                success: true,
                message: "Equipamentos listados com sucesso.",
                data: equipamentos
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

            const equipamento = await EquipamentoService.buscarPorId(id);

            return res.status(200).json({
                success: true,
                message: "Equipamento encontrado com sucesso.",
                data: equipamento
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
            const equipamento = await EquipamentoService.cadastrar(req.body);

            return res.status(201).json({
                success: true,
                message: "Equipamento cadastrado com sucesso.",
                data: equipamento
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

            const equipamento = await EquipamentoService.editar(id, req.body);

            return res.status(200).json({
                success: true,
                message: "Equipamento atualizado com sucesso.",
                data: equipamento
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

            await EquipamentoService.excluir(id);

            return res.status(200).json({
                success: true,
                message: "Equipamento excluído com sucesso."
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = EquipamentoController;
