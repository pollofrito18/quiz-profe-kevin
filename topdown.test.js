const request = require('supertest');
const app = require('./app');
describe('3 PRUEBAS TOP-DOWN', () => {
    test('1. GET /api/drones desde ruta', async () => {
        const res = await request(app).get('/api/drones');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    test('2. Controlador con modelo simulado', () => {
        const mockModel = { getAvailable: jest.fn().mockReturnValue([{ id: 'D-01', battery: 100, status: 'idle' }]) };
        const res = { json: jest.fn() };
        const ctrl = { getDrones: (req, res) => res.json(mockModel.getAvailable()) };
        ctrl.getDrones({}, res);
        expect(mockModel.getAvailable).toHaveBeenCalled();
    });
    test('3. POST /api/dispatch con servicio simulado', () => {
        const mockService = { dispatch: jest.fn().mockReturnValue({ id: 'D-01', battery: 80, status: 'en-vuelo' }) };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const ctrl = { dispatchDrone: (req, res) => res.status(200).json(mockService.dispatch(req.body.droneId, req.body.distance)) };
        ctrl.dispatchDrone({ body: { droneId: 'D-01', distance: 10 } }, res);
        expect(mockService.dispatch).toHaveBeenCalledWith('D-01', 10);
    });
});
