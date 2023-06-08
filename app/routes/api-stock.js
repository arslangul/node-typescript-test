"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const logger_1 = __importDefault(require("../logger/logger"));
const stock_json_1 = __importDefault(require("../data/stock.json"));
const transactions_json_1 = __importDefault(require("../data/transactions.json"));
function getStockLevel(sku) {
    const stockItem = stock_json_1.default.find(item => item.sku === sku);
    if (!stockItem) {
        throw new Error(`SKU '${sku}' not found in stock data`);
    }
    const transactions = transactions_json_1.default.filter(transaction => transaction.sku === sku);
    const totalQty = transactions.reduce((total, transaction) => {
        return transaction.type === 'order' ? total + transaction.qty : total - transaction.qty;
    }, 0);
    return { sku: sku, qty: stockItem.stock + totalQty };
}
router.get('/', (req, res) => {
    const sku = req.query.sku;
    try {
        const stockLevel = getStockLevel(sku);
        res.json(stockLevel);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
router.get('/', (req, res) => {
    logger_1.default.info('Fetching stocks...');
    res.status(200).send({ message: 'get stocks list' });
});
exports.default = router;
