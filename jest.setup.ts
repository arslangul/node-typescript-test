import app, { startServer, stopServer } from './index'; // Replace with the correct path to your server file
import { Express } from 'express';

let server: any;

export const setupServer = (): Promise<Express> => {
  return new Promise((resolve, reject) => {
    startServer(() => {
      server = app;
      resolve(server);
    });
  });
};

export const teardownServer = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    stopServer(() => {
      resolve();
    });
  });
};
