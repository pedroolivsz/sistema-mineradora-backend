const express = require("express");
const ServicoController = require("../controllers/ServicoController");
const validateServico = require("../middlewares/validateServico");

const router = express.Router();

router.get("/", ServicoController.listar);

router.get("/:id", ServicoController.buscarPorId);

router.post(
    "/",
    validateServico,
    ServicoController.cadastrar
);

router.put(
    "/:id",
    validateServico,
    ServicoController.editar
);

router.delete("/:id", ServicoController.excluir);

module.exports = router;