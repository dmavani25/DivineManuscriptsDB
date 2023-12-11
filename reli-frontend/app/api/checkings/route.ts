import { NextRequest, NextResponse } from 'next/server';
import { query, getClient } from '../../../db/db';
import { checkings } from '../../../db/db-types';
import { stringify } from 'querystring';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const queryParams = [];
    const whereClauses = [];

    for (const [key, value] of searchParams) {
        if (value) {
            queryParams.push(value);
            whereClauses.push(`${key} = $${queryParams.length}`);
        }
    }

    let queryString = 'SELECT * FROM checkings';
    if (whereClauses.length > 0) {
        queryString += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    const client = await getClient();
    try {
        const result = await client.query(queryString, queryParams);
        if (result.rowCount === 0) {
            return new NextResponse('No checkings found', { status: 404 });
        }
        const books = await Promise.all(result.rows.map(async (row: { bookname: string; authorname: string; }) => {
            return await client.query('SELECT * FROM book WHERE bookname = $1 AND authorname = $2', [row.bookname, row.authorname]);
        }));

        return NextResponse.json(books.map((bookResult: any) => bookResult.rows[0]), { status: 200 });
    } catch (error) {
        return new NextResponse('Failed to fetch checkings', { status: 500 });
    } finally {
        client.release();
    }
}
export async function POST(req: Request) {
    const client = await getClient();
    try {
        const checkings: checkings = await req.json();
        if (
            checkings.bookname === '' ||
            checkings.useremail === '' ||
            checkings.authorname === '' ||
            checkings.checkedoutsince === ''
        ) {
            return new NextResponse(
                'bookname, useremail, authorname, and checkedoutsince are required',
                { status: 400 }
            );
        }

        await client.query('BEGIN'); // Start transaction

        const insertResult = await client.query(
            'INSERT INTO checkings (bookname, useremail, authorname, checkedoutsince) VALUES ($1, $2, $3, $4) RETURNING *',
            [
                checkings.bookname,
                checkings.useremail,
                checkings.authorname,
                checkings.checkedoutsince
            ]
        );

        const updateResult = await client.query(
            'UPDATE book SET checkedoutcopies = checkedoutcopies - 1 WHERE bookname = $1 AND authorname = $2 AND checkedoutcopies > 0 RETURNING *',
            [checkings.bookname, checkings.authorname]
        );

        // if (updateResult.rowCount === 0) {
        //     throw new Error('Insufficient copies or book not found');
        // }

        await client.query('COMMIT'); // Commit transaction
        
        return NextResponse.json(insertResult.rows[0], {status:200}); // Return the created checking
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction in case of error
        return new NextResponse('Failed to create checking: ' + error, { status: 500 });
    } finally {
        client.release();
    }
}


export async function PUT(req: NextRequest) {
    const client = await getClient();
    try {
        const checkings: checkings = await req.json(); 
        
        if (
            checkings.bookname === '' ||
            checkings.useremail === '' ||
            checkings.authorname === '' ||
            checkings.checkedoutsince === ''
        ) {
            return new NextResponse(
                'Bookname, useremail, authorname and checkedoutsince are required',
                { status: 400 }
            );
        }
        // only update the date field
        const { rows } = await client.query(
            'UPDATE checkings SET checkedoutsince = $1 WHERE bookname = $2 AND useremail = $3 AND authorname = $4 RETURNING *',
            [
                checkings.checkedoutsince,
                checkings.bookname,
                checkings.useremail,
                checkings.authorname
            ]
        );
        return NextResponse.json({ message: 'Checking updated successfully' });
    } catch (error) {
        return new NextResponse('Failed to update checking', { status: 500 });
    } finally {
        client.release();
    }
}

export async function DELETE(req: NextRequest) {
    const client = await getClient();
    try {

        const checkings: checkings = await req.json();
        if (
            checkings.bookname === '' ||
            checkings.authorname === '' ||
            checkings.useremail === ''
        ) {
            return new NextResponse(
                'bookname, useremail, authorname are required',
                { status: 400 }
            );
        }
        // delete the checking
        await client.query('BEGIN'); // Start transaction

        const { rows } = await client.query(
            'DELETE FROM checkings WHERE bookname = $1 AND useremail = $2 AND authorname = $3 RETURNING *',
            [checkings.bookname, checkings.useremail, checkings.authorname]
        ); 

        // increment the number of copies of the book
        const updateResult = await client.query(
            'UPDATE book SET checkedoutcopies = checkedoutcopies + 1 WHERE bookname = $1 AND authorname = $2 RETURNING *',
            [checkings.bookname, checkings.authorname]
        );

        await client.query('COMMIT'); // Commit transaction
        
        return NextResponse.json({ message: 'Checking deleted successfully' }, {status:200});
    } catch (error) {
        return new NextResponse('Failed to delete checking', { status: 500 });
    } finally {
        client.release();
    }
}
