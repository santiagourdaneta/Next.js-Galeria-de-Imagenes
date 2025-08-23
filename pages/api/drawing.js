// pages/api/drawing.js

import { db } from '../../db.js';

export default function handler(req, res) {
    // Obtenemos el ID del dibujo de la URL (por ejemplo: ?id=1)
    const { id } = req.query;

    // Buscamos el dibujo en el cofre del tesoro
    const drawing = db.prepare('SELECT * FROM drawings WHERE id = ?').get(id);

    if (!drawing) {
        // Si no encontramos el dibujo, enviamos un mensaje de "no encontrado"
        return res.status(404).json({ message: 'Drawing not found' });
    }

    // Si lo encontramos, lo enviamos de vuelta como JSON
    res.status(200).json(drawing);
}