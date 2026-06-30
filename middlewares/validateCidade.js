function validateCidade(req, res, next) {
    const { nome, estado, populacao } = req.body;
    if (!nome || !estado || populacao === undefined) {
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

    if (typeof estado !== "string" || estado.trim().length !== 2) {
        return res.status(400).json({
            success: false,
            message: "O estado deve possuir exatamente 2 caracteres."
        });
    }

    const populacaoNumero = Number(populacao);

    if (!Number.isInteger(populacaoNumero) || populacaoNumero < 0) {
        return res.status(400).json({
            success: false,
            message: "A população deve ser um número inteiro maior ou igual a zero."
        });
    }

    req.body.nome = nome.trim();
    req.body.estado = estado.trim().toUpperCase();
    req.body.populacao = populacaoNumero;

    next();
}

module.exports = validateCidade;
