
import {query, getClient, pool} from '../../../../db/db';
import z from 'zod';


// Zod schema for validating request parameters


export async function GET(req: Request, {params}: {params: {bookname: string}}  ) {
    const client = await getClient();
    const {bookname} = params;
    // Validate request parameters against schema. Regex ensures that only alphanumeric characters plus symbols are allowed in bookname
    z.string().min(1).max(255).regex(/^[a-zA-Z0-9\s\-_.,!?:;'()[\]{}]+$/).parse(bookname);
    
    try {
        const { rows } = await query(`SELECT * FROM public.book WHERE bookname = $1`, [bookname]); // PUT QUERIES HERE
        return Response.json(rows);
    } catch (error) {
        const message = (error as Error).message;
        return new Response(message, { status: 500 });
    } finally {
        client.release();
    }
}