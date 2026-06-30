const express = require("express");
const FuncionarioController = require("../controllers/FuncionarioController");

const router = express.Router();

router.get("/", FuncionarioController.listar);

router.get("/:id", FuncionarioController.buscarPorId);

router.post("/", FuncionarioController.cadastrar);

router.put("/:id", FuncionarioController.editar);

router.delete("/:id", FuncionarioController.excluir);

module.exports = router;