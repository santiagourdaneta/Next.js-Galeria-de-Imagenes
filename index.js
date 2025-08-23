const { createDrawing, getAllDrawings } = require('./db.js');

// Crea un nuevo dibujo en el cofre
createDrawing('Mi Casa del Árbol', 'Una casa del árbol con un tobogán.');

// Pide al cofre que te muestre todos los dibujos
const allDrawings = getAllDrawings();
console.log(allDrawings);