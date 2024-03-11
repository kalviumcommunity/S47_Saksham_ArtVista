const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = 'data.json';

// Middleware to parse JSON bodies
app.use(express.json());

// CRUD operations

// Read all records
app.get('/records', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Create a new record
app.post('/records', (req, res) => {
    const newRecord = req.body;
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const records = JSON.parse(data);
        records.push(newRecord);
        fs.writeFile(DATA_FILE, JSON.stringify(records, null, 4), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Record created successfully');
        });
    });
});

// Update a record
app.put('/records/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    const updatedRecord = req.body;
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let records = JSON.parse(data);
        const index = records.findIndex(record => record.id === recordId);
        if (index === -1) {
            res.status(404).send('Record not found');
            return;
        }
        records[index] = updatedRecord;
        fs.writeFile(DATA_FILE, JSON.stringify(records, null, 4), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send('Record updated successfully');
        });
    });
});

// Delete a record
app.delete('/records/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let records = JSON.parse(data);
        const index = records.findIndex(record => record.id === recordId);
        if (index === -1) {
            res.status(404).send('Record not found');
            return;
        }
        records.splice(index, 1);
        fs.writeFile(DATA_FILE, JSON.stringify(records, null, 4), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send('Record deleted successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
