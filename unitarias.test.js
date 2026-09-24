const { DroneModel, DroneService } = require('./app');
describe('10 PRUEBAS UNITARIAS', () => {
    beforeEach(() => { DroneModel._reset(); });
    test('1. findById() encuentra D-01', () => {
        const dron = DroneModel.findById('D-01');
        expect(dron).toBeDefined();
        expect(dron.id).toBe('D-01');
    });
    test('2. findById() devuelve undefined para dron inexistente', () => {
        expect(DroneModel.findById('D-99')).toBeUndefined();
    });
    test('3. getAvailable() devuelve drones idle', () => {
        const disp = DroneModel.getAvailable();
        expect(disp.length).toBe(2);
        expect(disp.every(d => d.status === 'idle')).toBe(true);
    });
    test('4. getAvailable() excluye drones en-vuelo', () => {
        DroneModel._setDrones([{ id: 'D-01', battery: 100, status: 'idle' },{ id: 'D-02', battery: 100, status: 'en-vuelo' }]);
        expect(DroneModel.getAvailable().length).toBe(1);
    });
    test('5. Acepta un viaje cuando hay bateria suficiente', () => {
        expect(DroneService.dispatch('D-01', 10).id).toBe('D-01');
    });
    test('6. Rechaza un viaje con bateria insuficiente', () => {
        expect(() => DroneService.dispatch('D-02', 10)).toThrow('Batería insuficiente');
    });
    test('7. Calcula consumo como distancia x 2', () => {
        DroneService.dispatch('D-01', 10);
        expect(DroneModel.findById('D-01').battery).toBe(80);
    });
    test('8. Resta correctamente la bateria', () => {
        DroneService.dispatch('D-01', 5);
        expect(DroneModel.findById('D-01').battery).toBe(90);
    });
    test('9. Rechaza un dron que no esta idle', () => {
        DroneModel._setDrones([{ id: 'D-01', battery: 100, status: 'en-vuelo' }]);
        expect(() => DroneService.dispatch('D-01', 5)).toThrow('Dron no disponible');
    });
    test('10. Cambia el estado a en-vuelo despues del despacho', () => {
        expect(DroneService.dispatch('D-01', 10).status).toBe('en-vuelo');
    });
});
