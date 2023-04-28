import { createPool, Pool, RowDataPacket } from 'mysql2/promise';
import * as dotenv from "dotenv";
dotenv.config();

const config = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    // waitForConnections: true,
    // connectionLimit: 20,
    // queueLimit: 0,
};

export const pool: Pool = createPool(config);

// pool.on('enqueue', () => {
//     console.log('Waiting for available connection slot');
//   });
  
//   pool.on('release', () => {
//     console.log('Connection released');
//   });
  
//   pool.on('error', (error) => {
//     console.error('Error in MySQL connection pool:', error);
//     pool.end();
//   });

export async function execute<T>(query: string, params?: any[]){
    return await pool.execute<T & RowDataPacket[]>(query, params)
  }