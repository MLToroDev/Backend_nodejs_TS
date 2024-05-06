import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_HOST,
    DB_USER,
    PASSWORD,
    DB_NAME
} = process.env;

const connection = mysql.createConnection({
    host: DB_HOST!,
    database: DB_NAME!,
    user: DB_USER!,
    password: PASSWORD!
});

export default connection;
