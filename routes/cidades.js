const express = require("express");
const CidadeController = require("../controllers/CidadeController");

const router = express.Router();

router.get("/", CidadeController.listar);

router.get("/:id", CidadeController.buscarPorId);

router.post("/", CidadeController.cadastrar);

router.put("/:id", CidadeController.editar);

router.delete("/:id", CidadeController.excluir);

module.exports = router;