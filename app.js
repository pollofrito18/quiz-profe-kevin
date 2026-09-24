const express = require('express');
const app = express();
app.use(express.json());
const initialDrones = [{ id: 'D-01', battery: 100, status: 'idle' },{ id: 'D-02', battery: 15, status: 'idle' }];
let drones = JSON.parse(JSON.stringify(initialDrones));
const DroneModel = {
    getAvailable: () => drones.filter(d => d.status === 'idle'),
    findById: (id) => drones.find(d => d.id === id),
    _getAll: () => drones,
    _reset: () => { drones = JSON.parse(JSON.stringify(initialDrones)); },
    _setDrones: (newDrones) => { drones = newDrones; }
};
const DroneService = {
    dispatch: (droneId, distanceKm) => {
        const drone = DroneModel.findById(droneId);
        if (!drone) throw new Error('Dron no encontrado');
        if (drone.status !== 'idle') throw new Error('Dron no disponible');
        const requiredBattery = distanceKm * 2;
        if (drone.battery < requiredBattery) throw new Error('Batería insuficiente');
        drone.battery -= requiredBattery;
        drone.status = 'en-vuelo';
        return drone;
    }
};
const DroneController = {
    getDrones: (req, res) => res.json(DroneModel.getAvailable()),
    dispatchDrone: (req, res) => {
        try {
            const { droneId, distance } = req.body;
            const result = DroneService.dispatch(droneId, distance);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
app.get('/api/drones', DroneController.getDrones);
app.post('/api/dispatch', DroneController.dispatchDrone);
module.exports = app;
module.exports.DroneModel = DroneModel;
module.exports.DroneService = DroneService;
module.exports.DroneController = DroneController;
