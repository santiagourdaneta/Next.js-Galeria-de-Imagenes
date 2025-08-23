// pages/api/edit.js
import { IncomingForm } from 'formidable';
import { db } from '../../db.js';

export const config = {
    api: {
        bodyParser: false, // We must disable this to parse the form data
    },
};

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const form = new IncomingForm();

    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Upload failed.' });
        }

        const { id } = req.query;
        const title = fields.title[0];
        const description = fields.description[0];

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        const stmt = db.prepare('UPDATE drawings SET title = ?, description = ? WHERE id = ?');
        stmt.run(title, description, id);

        res.status(200).json({ success: true });
    });
}