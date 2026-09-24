Proyecto desarrollado para gestionar entregas con drones, aplicando lógica de negocio realista y validada con pruebas automatizadas.

Se implementó una API REST con Node.js y Express para:

consultar drones disponibles,
buscar drones por ID,
validar batería antes del despacho,
calcular consumo según la distancia recorrida,
impedir envíos si el dron no está disponible,
cambiar el estado del dron a “en-vuelo” tras el despacho.
Además, se corrigieron errores críticos de la lógica original:

el consumo de batería se calculaba incorrectamente,
el dron quedaba en estado idle luego del envío y podía reutilizarse indebidamente.
Para asegurar la calidad, se realizaron pruebas unitarias, de integración y de regresión, logrando 21 pruebas exitosas.

Versión más “presentable” para entregar
Este proyecto consiste en una API para gestión de entregas con drones, diseñada para validar disponibilidad, batería y estados de cada unidad antes de realizar un despacho. La lógica de negocio fue corregida y reforzada para asegurar cálculos correctos de consumo energético y evitar reutilización indebida de drones no disponibles. El sistema fue desarrollado con Node.js, Express y Jest, y quedó verificado con pruebas automatizadas que validan el comportamiento esperado y la no regresión de errores.
