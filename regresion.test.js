const { DroneModel, DroneService } = require('./app');
describe('2 PRUEBAS DE REGRESION', () => {
    beforeEach(() => { DroneModel._reset(); });
    test('1. 10 km x 2 = 20% -> 100% - 20% = 80%', () => {
        expect(DroneService.dispatch('D-01', 10).battery).toBe(80);
    });
    test('2. Estado en-vuelo y no acepta otro envio', () => {
        DroneService.dispatch('D-01', 10);
        expect(() => DroneService.dispatch('D-01', 5)).toThrow('Dron no disponible');
    });
});
