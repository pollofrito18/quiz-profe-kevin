const { DroneModel, DroneService } = require('./app');
describe('3 PRUEBAS BOTTOM-UP', () => {
    beforeEach(() => { DroneModel._reset(); });
    test('1. DroneModel.findById()', () => { expect(DroneModel.findById('D-01').id).toBe('D-01'); });
    test('2. DroneModel.getAvailable()', () => { expect(DroneModel.getAvailable().length).toBe(2); });
    test('3. DroneService.dispatch() usando modelo real', () => {
        const r = DroneService.dispatch('D-01', 10);
        expect(r.battery).toBe(80);
        expect(DroneModel.getAvailable().find(d => d.id === 'D-01')).toBeUndefined();
    });
});
