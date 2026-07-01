const cors = require("cors");

const allowedOrigins = [
    "http://localhost:5173",
    "https://gestao-de-mineradoras.netlify.app"
];

module.exports = cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error("Origem não permitida"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}); 