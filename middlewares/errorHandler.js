function errorHandler(error, req, res, next) {
    console.error(error);

    const status = error.status || 500;

    return res.status(status).json({
        success: false,
        message: error.message || "Erro interno do servidor."
    });
}

module.exports = errorHandler;
