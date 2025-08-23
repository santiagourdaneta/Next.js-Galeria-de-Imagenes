// pages/api/add.js
import { createDrawing, db } from '../../db.js';
import { IncomingForm } from 'formidable';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Configuration
    cloudinary.config({ 
        cloud_name: 'dx8bsknb1', 
        api_key: '741726254581956', 
        api_secret: 'RAdhhJCEgsq07iO8JYb1DoUt4S4' 
    });

export const config = {
    api: {
        bodyParser: false, // Tell Next.js not to eat the picture file
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Wrap the form parsing logic in a Promise to wait for it
        const result = await new Promise((resolve, reject) => {
            const form = new IncomingForm({ keepExtensions: true });

            form.parse(req, async (err, fields, files) => {
                if (err) return reject(err);

                const title = fields.title[0];
                const description = fields.description[0];
                const imageFile = files.image[0];

                if (!title || !description || !imageFile) {
                    return res.status(400).json({ message: 'All fields are required.' });
                }

                try {
                    // Send the picture to Cloudinary
                    const uploadResult = await cloudinary.uploader.upload(imageFile.filepath);
                    const imageUrl = uploadResult.secure_url;
                    
                    // Save the drawing to the database
                    const newId = createDrawing(title, description, imageUrl);

                    resolve({ id: newId, imageUrl });
                } catch (error) {
                    reject(error);
                }
            });
        });

        // If everything is successful, send the response
        res.status(200).json({ success: true, id: result.id, imagePath: result.imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Upload failed.' });
    }
}