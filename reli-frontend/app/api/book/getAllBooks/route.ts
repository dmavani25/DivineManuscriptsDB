
import {query, getClient, pool} from '../../../../db/db';

// EXAMPLE http QUERY
export async function GET() {
    const client = await getClient();
    try {
        const { rows } = await query(`SELECT * FROM public.book`); // PUT QUERIES HERE
        return Response.json(rows);
    } catch (error) {
        const message = (error as Error).message;
        return new Response(message, { status: 500 });
    } finally {
        client.release();
    }
}
