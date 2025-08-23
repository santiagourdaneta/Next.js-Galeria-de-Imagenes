// pages/api/delete.js
import { deleteDrawing } from '../../db.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.body;
  deleteDrawing(id);

  res.status(200).json({ success: true });
}