"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
if (!process.env.PORT) {
    console.log("PORT not found!");
}
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL, // Replace with your frontend origin
    credentials: true, // Required for withCredentials: true on frontend
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1", routers_1.default);
app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
});
if (process.env.MONGODB_URI) {
    mongoose_1.default.connect(process.env.MONGODB_URI);
}
else {
    console.log("MONGODB_URI not found ");
}
mongoose_1.default.connection.on("error", () => {
    console.log("Could not connect to mongodb");
});
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to mongodb!");
});
