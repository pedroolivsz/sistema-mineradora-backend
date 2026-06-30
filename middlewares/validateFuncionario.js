function validateFuncionario(req, res, next) {
    const {
        nome,
        cargo,
        telefone,
        email,
        salario,
        cidade_id
    } = req.body;
    
    if (
        !nome ||
        !cargo ||
        !telefone ||
        !email ||
        salario === undefined ||
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

    if (typeof cargo !== "string" || cargo.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Cargo inválido."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "E-mail inválido."
        });
    }

    const salarioNumero = Number(salario);

    if (isNaN(salarioNumero) || salarioNumero < 0) {
        return res.status(400).json({
            success: false,
            message: "O salário deve ser maior ou igual a zero."
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
    req.body.cargo = cargo.trim();
    req.body.telefone = telefone.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.salario = salarioNumero;
    req.body.cidade_id = cidadeIdNumero;

    next();
}

module.exports = validateFuncionario;
