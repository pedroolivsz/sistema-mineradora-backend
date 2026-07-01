const allowedOrigins = [
    "localhost",
    "gestao-de-mineradoras.netlify.app"
];

origin(origin, callback) {
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(domain =>
        origin.includes(domain)
    );

    if (isAllowed) {
        return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
}