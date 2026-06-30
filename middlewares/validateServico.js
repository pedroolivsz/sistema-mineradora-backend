function validateServico(req, res, next) {
    const {
        nome,
        descricao,
        data_inicio,
        data_fim,
        valor,
        equipamentos
    } = req.body;

    if (
        !nome ||
        !descricao ||
        !data_inicio ||
        !data_fim ||
        valor === undefined ||
        equipamentos === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "Todos os campos são obrigatórios."
        });
    }

    if (typeof nome !== "string" || nome.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Nome inválido."
        });
    }

    if (typeof descricao !== "string" || descricao.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Descrição inválida."
        });
    }

    if (isNaN(Date.parse(data_inicio))) {
        return res.status(400).json({
            success: false,
            message: "Data de início inválida."
        });
    }

    if (isNaN(Date.parse(data_fim))) {
        return res.status(400).json({
            success: false,
            message: "Data de fim inválida."
        });
    }

    if (new Date(data_fim) < new Date(data_inicio)) {
        return res.status(400).json({
            success: false,
            message: "A data de fim deve ser maior ou igual à data de início."
        });
    }

    const valorNumero = Number(valor);

    if (isNaN(valorNumero) || valorNumero < 0) {
        return res.status(400).json({
            success: false,
            message: "O valor deve ser maior ou igual a zero."
        });
    }

    if (!Array.isArray(equipamentos)) {
        return res.status(400).json({
            success: false,
            message: "Equipamentos deve ser um array."
        });
    }

    if (equipamentos.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Informe pelo menos um equipamento."
        });
    }

    const equipamentosIds = equipamentos.map(Number);

    if (
        equipamentosIds.some(
            id => !Number.isInteger(id) || id <= 0
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Todos os IDs dos equipamentos devem ser inteiros positivos."
        });
    }

    req.body.nome = nome.trim();
    req.body.descricao = descricao.trim();
    req.body.valor = valorNumero;
    req.body.equipamentos = equipamentosIds;

    next();
}

module.exports = validateServico;
