
import { NextRequest } from 'next/server';
import {query, getClient, pool} from '../../../db/db';
import { book } from '../../../db/db-types';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const queryParams = [];
    const whereClauses = [];
    
    for (const [key, value] of searchParams) {
        if (value) {
            queryParams.push(`%${value}%`); // Prepare value for ILIKE pattern matching
            whereClauses.push(`${key} ILIKE $${queryParams.length}`); // Use ILIKE for case-insensitive comparison
        }
    }

    // If no query parameters were provided, return all books
    if (whereClauses.length === 0) {
        const client = await getClient();
        try {
            const { rows } = await client.query('SELECT * FROM public.book');
            return Response.json(rows);
        } catch (error) {
            const message = (error as Error).message;
            return new Response(message, { status: 500 });
        } finally {
            client.release();
        }
    }

    const queryString = `SELECT * FROM public.book WHERE ${whereClauses.join(' AND ')}`;

    const client = await getClient();
    try {
        const { rows } = await client.query(queryString, queryParams);
        if (rows.length === 0) {
            return new Response("No books found with the provided criteria", { status: 404 });
        }
        
        return Response.json(rows);
    } catch (error) {
        const message = (error as Error).message;
        return new Response(message, { status: 500 });
    } finally {
        client.release();
    }
}



export async function PUT(req: NextRequest) {
    // USE FOR UPDATES
    const searchParams = req.nextUrl.searchParams


    const book: book = {
        bookname: searchParams.get('bookname') || '' ,
        authorname: searchParams.get('authorname') || '' ,
        religion: searchParams.get('religion') || '',
        shelf: searchParams.get('shelf') || '',
        wing: searchParams.get('wing') || '',
        numcopies: parseInt(searchParams.get('numcopies') || '1'),
        checkedoutcopies: parseInt(searchParams.get('checkedoutcopies') || '0')
    };

    if (book.bookname === '') {
        return new Response("PUT request received but bookname is empty", { status: 200 });
    }
    if (book.authorname === '') {
        return new Response("PUT request received but authorname is empty", { status: 200 });
    }
    
    const client = await getClient();
    // Validate request parameters against schema. Regex ensures that only alphanumeric characters plus symbols are allowed in bookname
    try {
        const rows = await client.query(`UPDATE public.book SET religion = $3, shelf = $4, wing = $5, numcopies = $6, checkedoutcopies = $7 WHERE bookname = $1 AND authorname = $2`, [
            book.bookname,
            book.authorname,
            book.religion,
            book.shelf,
            book.wing,
            book.numcopies,
            book.checkedoutcopies
        ]);
        if (rows.rowCount === 0) {
            return new Response("PUT request received but book does not exist", { status: 200 });
        }
        else {
            return new Response("PUT request received and book updated", { status: 201 });
        }
    } catch (error) {
        const message = (error as Error).message;
        return new Response(message, { status: 500 });
    } finally {
        client.release();
    }
   
}

export async function DELETE(req: NextRequest){
    const searchParams = req.nextUrl.searchParams
    const bookname = searchParams.get('bookname');
    const authorname = searchParams.get('authorname');
    const client = await getClient();

    if (bookname === '') {
        return new Response("DELETE request received but bookname is empty", { status: 200 });
    }
    if (authorname === '') {
        return new Response("DELETE request received but authorname is empty", { status: 200 });
    }

    try {
        const rows = await client.query(`DELETE FROM public.book WHERE bookname = $1 AND authorname = $2`, [bookname, authorname]);
        if (rows.rowCount === 0) {
            return new Response("DELETE request received but book does not exist", { status: 200 });
        }
        else {
            return new Response("DELETE request received and book deleted", { status: 201 });
        }
    }
    catch (error) {
        const message = (error as Error).message;
        return new Response(message, { status: 500 });
    } finally {
        client.release();
    }


}

export async function POST(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams

    const bookname = searchParams.get('bookname') || '';
    const authorname = searchParams.get('authorname') || '';
    const religion = searchParams.get('religion') || '';
    const shelf = searchParams.get('shelf') || '';
    const wing = searchParams.get('wing') || '';
    const numcopies = searchParams.get('numcopies') || '1';
    const checkedoutcopies = searchParams.get('checkedoutcopies') || '0';

    if (bookname === '') {
        return new Response("POST request received but bookname is empty", { status: 200 });
    }
    if (authorname === '') {
        return new Response("POST request received but authorname is empty", { status: 200 });
    }

    const book: book = {
        bookname: bookname,
        authorname: authorname,
        religion: religion,
        shelf: shelf,
        wing: wing,
        numcopies: parseInt(numcopies),
        checkedoutcopies: parseInt(checkedoutcopies)
    };

    
    const client = await getClient();
    // Validate request parameters against schema. Regex ensures that only alphanumeric characters plus symbols are allowed in bookname
    try {


        const rows = await client.query(`INSERT INTO public.book (bookname, authorname, religion, shelf, wing, numcopies, checkedoutcopies)
        VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (bookname, authorname) DO NOTHING
        `, [
            book.bookname,
            book.authorname,
            book.religion,
            book.shelf,
            book.wing,
            book.numcopies,
            book.checkedoutcopies
        ]
         ); 

         if (rows.rowCount === 0) {
            throw new Error("Book already exists");
         }
         else {
            return new Response(`POST request received and book (${book.bookname}, ${book.authorname}) inserted`, { status: 201 }

            );
         }


    } catch (error) {
        const message = (error as Error).message;
        return new Response(message, { status: 500 });
    } finally {
        client.release();
    }
}

