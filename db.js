// db.js

// Import the library that knows how to talk to SQLite
const Database = require('better-sqlite3');

// This is the name of our treasure chest file.
// It will be created automatically if it doesn't exist.
const DB_FILE = 'my-drawings.db';

// This is like opening our treasure chest.
// We make sure it's open so we can put things in or take things out.
const db = new Database(DB_FILE);

// This is an instruction to set up our treasure chest for the first time.
// It creates a table (a list) called 'drawings' with columns for id, title, and description.
const setupDatabase = () => {
    // We run a command to create the table.
    // The IF NOT EXISTS part means it will only create the table if it doesn't already exist,
    // so it's safe to run this code every time.
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

// We run the setup function to make sure our treasure chest is ready.
setupDatabase();

// Now we can create functions that do specific things with our treasure chest.

// This function is for putting a new drawing in the chest.
const createDrawing = (title, description, image_path) => {
    const statement = db.prepare('INSERT INTO drawings (title, description, image_path) VALUES (?, ?, ?)');
    const result = statement.run(title, description, image_path);
    return result.lastInsertRowid;
};

const deleteDrawing = (id) => {
    const statement = db.prepare('DELETE FROM drawings WHERE id = ?');
    statement.run(id);
};


// This function is for getting all the drawings from our chest.
const getAllDrawings = () => {
    // We use .all() to get all the rows.
   return db.prepare('SELECT * FROM drawings ORDER BY id DESC').all();
};


// We'll export these functions so other files in our project can use them.
module.exports = {
    db,
    createDrawing,
    getAllDrawings,
    deleteDrawing,
};