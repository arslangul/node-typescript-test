"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jest_setup_1 = require("../jest.setup"); // Replace with the correct path to your test setup file
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, jest_setup_1.setupServer)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jest_setup_1.teardownServer)();
}));
describe('GET /', () => {
    it('should return 200 and a success message', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Express + TypeScript Server' });
    }));
});
describe('GET /api/v1/stocks/:sku', () => {
    it('should return 200 and the stock level for a valid SKU', () => __awaiter(void 0, void 0, void 0, function* () {
        const sku = 'LTV719449/39/39'; // Replace with a valid SKU
        const response = yield (0, supertest_1.default)(app).get(`/api/v1/stocks/${sku}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('sku', sku);
        expect(response.body).toHaveProperty('qty');
    }));
    it('should return 404 for an invalid SKU', () => __awaiter(void 0, void 0, void 0, function* () {
        const sku = 'INVALID_SKU'; // Replace with an invalid SKU
        const response = yield (0, supertest_1.default)(app).get(`/api/v1/stocks/${sku}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    }));
});
