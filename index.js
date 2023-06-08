"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServer = exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./app/logger/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = (0, express_promise_router_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3006;
const api_stock_1 = __importDefault(require("./app/routes/api-stock"));
app.use(router);
app.use('/api/v1/stocks', api_stock_1.default); //stocks route
app.get('/', (req, res) => {
    logger_1.default.info("Server Listening On Port 3000");
    res.status(200).send({ message: 'Express + TypeScript Server' });
});
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
let server;
const startServer = (callback) => {
    server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        if (callback) {
            callback();
        }
    });
};
exports.startServer = startServer;
const stopServer = (callback) => {
    if (server) {
        server.close(() => {
            console.log('Server stopped');
            if (callback) {
                callback();
            }
        });
    }
};
exports.stopServer = stopServer;
(0, exports.startServer)(() => {
    console.log('Server started successfully');
});
// Export the app instance directly
exports.default = app;
