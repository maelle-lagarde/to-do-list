require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'origin');
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bonjour Monde avec Express!');
});

// connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

// route GET display tasks saved in database.
app.get('/tasklist', (request, response) => {
    // console.log(request.query, "request");
    // console.log(request, "request");
    const searchDescription = `%${request.query.description}%`;
    const sql = "SELECT * FROM `task` WHERE description LIKE ?";

    db.query(sql, [searchDescription], (error, data) => {
        if (error) {
            console.log('if')
            return response.json(error)
        } else {
            console.log('else')
            console.log(response);
            return response.json(data)
        }
    })
});

// route POST add task in database.
app.post('/add-task', (request, response) => {
    const { description } = request.body;

    const sql = "INSERT INTO `task`(`description`) VALUES (?)";

    db.query(sql, [description], (error, data) => {
        if (error) {
            return response.json(error);
        } else {
            return response.json({ message: 'Task saved!' });
        }
    });
});

// route POST update task saved in database. 
app.post('/update-task', (request, response) => {
    const { description } = request.body;

    const sql = "UPDATE task SET description = description = ? WHERE id =?";

    db.query(sql, [description], (error, data) => {
        if (error) {
            return response.json(error);
        } else {
            return response.json({ message: 'Task updated!' });
        }
    });
});

// route POST delete task from database.
app.post('/delete-task', (request, response) => {
    const { description } = request.body;

    const sql = "DELETE FROM `task` WHERE id =?";

    db.query(sql, [description], (error, data) => {
        if (error) {
            return response.json(error);
        } else {
            return response.json({ message: 'Task deleted!' });
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});