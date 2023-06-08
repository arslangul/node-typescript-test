import express, { Express, Request, Response } from 'express';
import Router from 'express-promise-router';
import dotenv from 'dotenv';
import logger from "./app/logger/logger";

dotenv.config();

const app: Express = express();
const router = Router();
const port = process.env.PORT ?? 3006;
import apiStocks from './app/routes/api-stock';


app.use(router);

app.use('/api/v1/stocks', apiStocks);//stocks route

app.get('/', (req: Request, res: Response) => {
  logger.info("Server Listening On Port 3000");
  res.status(200).send({message:'Express + TypeScript Server'});
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

let server: any;

export const startServer = (callback: () => void): void => {
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    if (callback) {
      callback();
    }
  });
};

export const stopServer = (callback: () => void): void => {
  if (server) {
    server.close(() => {
      console.log('Server stopped');
      if (callback) {
        callback();
      }
    });
  }
};

startServer(() => {
  console.log('Server started successfully');
});

// Export the app instance directly
export default app;