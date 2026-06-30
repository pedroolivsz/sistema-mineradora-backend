function validateEquipamento(req, res, next) {
    const {
        nome,
        modelo,
        fabricante,
        data_aquisicao,
        status,
        cidade_id
    } = req.body;

    if (
        !nome ||
        !modelo ||
        !fabricante ||
        !data_aquisicao ||
        !status ||
        cidade_id === undefined
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

    if (typeof modelo !== "string" || modelo.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Modelo inválido."
        });
    }

    if (typeof fabricante !== "string" || fabricante.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Fabricante inválido."
        });
    }

    if (isNaN(Date.parse(data_aquisicao))) {
        return res.status(400).json({
            success: false,
            message: "Data de aquisição inválida."
        });
    }

    const statusValidos = [
        "ATIVO",
        "MANUTENCAO",
        "INATIVO"
    ];

    const statusFormatado = status.trim().toUpperCase();

    if (!statusValidos.includes(statusFormatado)) {
        return res.status(400).json({
            success: false,
            message: "Status inválido."
        });
    }

    const cidadeIdNumero = Number(cidade_id);

    if (!Number.isInteger(cidadeIdNumero) || cidadeIdNumero <= 0) {
        return res.status(400).json({
            success: false,
            message: "Cidade inválida."
        });
    }

    req.body.nome = nome.trim();
    req.body.modelo = modelo.trim();
    req.body.fabricante = fabricante.trim();
    req.body.status = statusFormatado;
    req.body.cidade_id = cidadeIdNumero;

    next();
}

module.exports = validateEquipamento;
