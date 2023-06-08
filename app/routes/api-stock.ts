import express, {Request, Response} from 'express';
const router = express.Router();
import logger from "../logger/logger";
import stockData from '../data/stock.json';
import transactionsData from '../data/transactions.json';

interface CustomError extends Error {
  message: string;
}

function getStockLevel(sku: string) {
  const stockItem = stockData.find(item => item.sku === sku);
  if (!stockItem) {
    throw new Error(`SKU '${sku}' not found in stock data`);
  }

  const transactions = transactionsData.filter(transaction => transaction.sku === sku);
  const totalQty = transactions.reduce((total, transaction) => {
    return transaction.type === 'order' ? total + transaction.qty : total - transaction.qty;
  }, 0);

  return { sku: sku, qty: stockItem.stock + totalQty };
}

router.get('/', (req: Request, res: Response) => {
  const sku = req.query.sku;
  try {
    const stockLevel = getStockLevel(sku);
    res.json(stockLevel);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});
router.get('/', (req: Request, res: Response) => {
    logger.info('Fetching stocks...');
    res.status(200).send({message:'get stocks list'});
  });

export default router;