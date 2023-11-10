import { Pool, QueryResult } from 'pg';

console.log("\nConnecting to database.......................\n");
// Set up a connection pool
export const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432, // or your PostgreSQL port
});

// Export the necessary functions
export const query = (text: string, params?: any[]): Promise<QueryResult> => {
    return pool.query(text, params);
};

export const getClient = (): Promise<any> => {
    return pool.connect();
};

export default {
    query,
    getClient,
    pool,
}
