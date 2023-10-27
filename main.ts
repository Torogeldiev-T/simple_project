import * as express from 'express';
import { Request, Response } from "express"
import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'gi_dev',
    password: '',
    port: 5432,
});

client.connect();

const app = express();

app.post('/addAccount', (req: Request, res: Response) => {
    const query = `INSERT INTO accounts (name) VALUES ('${req.body.name}')`;
    client.query(query, (err, result) => {
        res.send(result);
    });
});

app.get('/get_account/:id', (req: Request, res: Response) => {
    const query = `SELECT * FROM accounts WHERE id = ${req.params.id}`;
    client.query(query, (err, result) => {
        res.send(result);
    });
});

app.get('/add_scores/:accountId', (req: Request, res: Response) => {
    const query = `INSERT INTO scores (account_id, score) VALUES (${req.params.accountId}, ${req.body.score})`;
    client.query(query, (err, result) => {
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});