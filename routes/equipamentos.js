const express = require("express");
const EquipamentoController = require("../controllers/EquipamentoController");

const router = express.Router();

router.get("/", EquipamentoController.listar);

router.get("/:id", EquipamentoController.buscarPorId);

router.post("/", EquipamentoController.cadastrar);

router.put("/:id", EquipamentoController.editar);

router.delete("/:id", EquipamentoController.excluir);

module.exports = router;