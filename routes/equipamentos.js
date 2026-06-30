const express = require("express");
const EquipamentoController = require("../controllers/EquipamentoController");
const validateEquipamento = require("../middlewares/validateEquipamento");

const router = express.Router();

router.get("/", EquipamentoController.listar);

router.get("/:id", EquipamentoController.buscarPorId);

router.post(
    "/",
    validateEquipamento,
    EquipamentoController.cadastrar
);

router.put(
    "/:id",
    validateEquipamento,
    EquipamentoController.editar
);

router.delete("/:id", EquipamentoController.excluir);

module.exports = router;