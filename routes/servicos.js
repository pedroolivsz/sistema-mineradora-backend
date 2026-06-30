const express = require("express");
const ServicoController = require("../controllers/ServicoController");

const router = express.Router();

router.get("/", ServicoController.listar);

router.get("/:id", ServicoController.buscarPorId);

router.post("/", ServicoController.cadastrar);

router.put("/:id", ServicoController.editar);

router.delete("/:id", ServicoController.excluir);

module.exports = router;