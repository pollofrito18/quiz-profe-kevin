const request = require('supertest');
const app = require('./app');
const { DroneModel } = require('./app');
describe('3 PRUEBAS BIG BANG', () => {
    beforeEach(() => { DroneModel._reset(); });
    test('1. GET /api/drones', async () => {
        const res = await request(app).get('/api/drones');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });
    test('2. POST /api/dispatch D-01 10km', async () => {
        const res = await request(app).post('/api/dispatch').send({ droneId: 'D-01', distance: 10 });
        expect(res.status).toBe(200);
        expect(res.body.battery).toBe(80);
    });
    test('3. Re-despachar D-01 debe dar 400', async () => {
        await request(app).post('/api/dispatch').send({ droneId: 'D-01', distance: 10 });
        const res2 = await request(app).post('/api/dispatch').send({ droneId: 'D-01', distance: 5 });
        expect(res2.status).toBe(400);
        expect(res2.body.error).toBe('Dron no disponible');
    });
});
