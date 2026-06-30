const express = require("express");
const CidadeController = require("../controllers/CidadeController");
const validateCidade = require("../middlewares/validateCidade");

const router = express.Router();

router.get("/",
    validateCidade,
    CidadeController.listar
);

router.get("/:id", CidadeController.buscarPorId);

router.post("/", CidadeController.cadastrar);

router.put("/:id",
    validateCidade,
    CidadeController.editar
);

router.delete("/:id", CidadeController.excluir);

module.exports = router;