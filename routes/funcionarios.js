const express = require("express");
const FuncionarioController = require("../controllers/FuncionarioController");
const validateFuncionario = require("../middlewares/validateFuncionario");

const router = express.Router();

router.get("/", FuncionarioController.listar);

router.get("/:id", FuncionarioController.buscarPorId);

router.post("/",
    validateFuncionario,
    FuncionarioController.cadastrar
);

router.put("/:id",
    validateFuncionario,
    FuncionarioController.editar
);

router.delete("/:id", FuncionarioController.excluir);

module.exports = router;