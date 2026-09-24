# Drone Delivery Hub

## Qué resolvimos
Se corrigieron dos errores de la lógica original:

1. El consumo de batería se calculaba mal porque se restaba la distancia en lugar del consumo real.
2. El dron seguía en estado `idle` después del despacho, por lo que podía volver a enviarse.

La regla correcta es:
- 1 km = 2% de batería
- consumo = distancia * 2
- ejemplo: 10 km = 20% => 100% - 20% = 80%
- después del despacho, el dron pasa a `en-vuelo`

## Cómo se implementó
La API está construida con:
- Node.js
- Express
- Jest
- Supertest

Se trabajó con tres capas:
- Modelo: consulta y manejo de los drones
- Servicio: lógica de negocio
- Controlador: manejo de peticiones HTTP

## Cómo hicimos las pruebas
Se desarrollaron 21 pruebas en total:

- 10 unitarias
- 3 Top-Down
- 3 Bottom-Up
- 3 Big Bang
- 2 de regresión

Estas pruebas validan:
- búsqueda por ID
- disponibilidad de drones
- cálculo del consumo
- descuento de batería
- rechazo por batería insuficiente
- rechazo si el dron no está `idle`
- cambio a `en-vuelo`
- validación por rutas HTTP
- no regresión de los bugs corregidos

## Verificación
Se ejecutó:

```bash
npm test
```

Resultado verificado:
- 5 suites ejecutadas
- 21 pruebas aprobadas
- 0 fallos

## Conclusión
Se corrigió la lógica del negocio y se validó con pruebas automatizadas. La API quedó funcionando según la regla del negocio y cumpliendo con los requisitos de la actividad.
