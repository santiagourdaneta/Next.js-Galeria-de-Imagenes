// seed.js

const Database = require('better-sqlite3');
const { faker } = require('@faker-js/faker');
const path = require('path');
const fs = require('fs');

// Ensure the database directory exists
const dbPath = path.join(__dirname, 'my-drawings.db');
const db = new Database(dbPath);

// Sample image URLs from various sources.
const sampleImageUrls = [
  'https://picsum.photos/200/300',
];

// Clean up old data if the database already exists
const setupDatabase = () => {
    // Drop the old table to start fresh
    db.exec(`DROP TABLE IF EXISTS drawings;`);
    
    // Create the new table with the image_path column
    db.exec(`
        CREATE TABLE IF NOT EXISTS drawings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            image_path TEXT
        );
    `);
    console.log('Database setup complete!');
};

// Seed the database with 250 fake records
const seedDatabase = () => {
    const insert = db.prepare('INSERT INTO drawings (title, description, image_path) VALUES (?, ?, ?)');
    
    db.transaction(() => {
        for (let i = 0; i < 250; i++) {
            const title = faker.lorem.words(3);
            const description = faker.lorem.paragraph(1);
            const imagePath = sampleImageUrls[Math.floor(Math.random() * sampleImageUrls.length)];
            insert.run(title, description, imagePath);
        }
    })();
    console.log('Seeded 250 fake drawings!');
};

// Run the setup and seeding functions
try {
    setupDatabase();
    seedDatabase();
} catch (error) {
    console.error('Error during seeding:', error.message);
} finally {
    db.close();
    console.log('Database connection closed.');
}