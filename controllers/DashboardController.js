const DashboardService = require("../services/DashboardService");

class DashboardController {

    static async resumo(req, res, next) {
        try {
            const resumo = await DashboardService.getResumo();

            return res.status(200).json({
                success: true,
                message: "Dashboard carregada com sucesso.",
                data: resumo
            });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = DashboardController;
