const express = require("express");
const DashboardController = require("../controllers/DashboardController");

const router = express.Router();

router.get("/", DashboardController.resumo);

module.exports = router;