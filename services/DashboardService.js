const Dashboard = require("../models/Dashboard");

class DashboardService {

    static async getResumo() {
        return await Dashboard.getResumo();
    }

}

module.exports = DashboardService;
