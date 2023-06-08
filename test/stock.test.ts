import request from 'supertest';
import { Express } from 'express';
import { setupServer, teardownServer } from '../jest.setup'; // Replace with the correct path to your test setup file

let app: Express;

beforeAll(async () => {
  app = await setupServer();
});

afterAll(async () => {
  await teardownServer();
});

describe('GET /', () => {
  it('should return 200 and a success message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Express + TypeScript Server' });
  });
});

describe('GET /api/v1/stocks/:sku', () => {
  it('should return 200 and the stock level for a valid SKU', async () => {
    const sku = 'LTV719449/39/39'; // Replace with a valid SKU
    const response = await request(app).get(`/api/v1/stocks/${sku}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sku', sku);
    expect(response.body).toHaveProperty('qty');
  });

  it('should return 404 for an invalid SKU', async () => {
    const sku = 'INVALID_SKU'; // Replace with an invalid SKU
    const response = await request(app).get(`/api/v1/stocks/${sku}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});
