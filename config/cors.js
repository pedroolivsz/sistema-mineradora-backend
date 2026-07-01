const cors = require("cors");

const allowedOrigins = [
    "localhost",
    "gestao-de-mineradoras.netlify.app"
];

module.exports = cors({
    origin(origin, callback) {
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.some(domain =>
            origin.includes(domain)
        );

        if (isAllowed) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
});