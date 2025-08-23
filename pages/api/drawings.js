// pages/api/drawings.js
import rateLimit from 'express-rate-limit';

// Creamos la regla para el controlador de tráfico
// 100 llamadas en un minuto desde la misma persona
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // máximo de 100 llamadas
  message: 'Demasiadas solicitudes, espera un momento.'
});

export default function handler(req, res) {
  limiter(req, res, async () => {
    const drawings = getAllDrawings();
    res.status(200).json(drawings);
  });
}