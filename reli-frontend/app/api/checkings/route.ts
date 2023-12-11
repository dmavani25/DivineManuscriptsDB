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
        return NextResponse.json(result.rows);
    } catch (error) {
        return new NextResponse('Failed to fetch checkings', { status: 500 });
    } finally {
        client.release();
    }
}

export async function POST(req: NextRequest) {
    const client = await getClient();
    try {
        const searchParams = req.nextUrl.searchParams;
        const checkings: checkings = {
            bookname: searchParams.get('bookname') || '',
            useremail: searchParams.get('useremail') || '',
            authorname: searchParams.get('authorname') || '',
            checkedoutsince: searchParams.get('checkedoutsince') || ''
        };
        if (
            checkings.bookname === '' ||
            checkings.useremail === '' ||
            checkings.authorname === '' ||
            checkings.checkedoutsince === ''
        ) {
            return new NextResponse(
                'bookname, useremail, authorname and checkedoutsince are required',
                { status: 400 }
            );
        }
        const { rows } = await client.query(
            'INSERT INTO checkings (bookname, useremail, authorname, checkedoutsince) VALUES ($1, $2, $3, $4) RETURNING *',
            [
                checkings.bookname,
                checkings.useremail,
                checkings.authorname,
                checkings.checkedoutsince
            ]
        );

            // decrement the number of copies of the book
            const book = await client.query(
                'UPDATE book SET numcopies = numcopies - 1 WHERE bookname = $1 AND authorname = $2 RETURNING *',
                [checkings.bookname, checkings.authorname]
            );

        return NextResponse.json({ message: 'Checking created successfully' });
    } catch (error) {
        return new NextResponse('Failed to create checking ' + error, { status: 500 });
    } finally {
        client.release();
    }
}

export async function PUT(req: NextRequest) {
    const client = await getClient();
    try {
        const searchParams = req.nextUrl.searchParams;
        const checkings: checkings = {
            bookname: searchParams.get('bookname') || '',
            useremail: searchParams.get('useremail') || '',
            authorname: searchParams.get('authorname') || '',
            checkedoutsince: searchParams.get('checkedoutsince') || ''
        };
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
        const searchParams = req.nextUrl.searchParams;
        const checkings: checkings = {
            bookname: searchParams.get('bookname') || '',
            useremail: searchParams.get('useremail') || '',
            authorname: searchParams.get('authorname') || '',
            checkedoutsince: searchParams.get('checkedoutsince') || ''
        };
        if (!checkings.useremail || !checkings.bookname || !checkings.authorname) {
            return new NextResponse(
                'Useremail, bookname and authorname are required',
                { status: 400 }
            );
        }
        const { rows } = await client.query(
            'DELETE FROM checkings WHERE bookname = $1 AND useremail = $2 AND authorname = $3 RETURNING *',
            [checkings.bookname, checkings.useremail, checkings.authorname]
        ); 

        // increment the number of copies of the book
        const book = await client.query(
            'UPDATE book SET numcopies = numcopies + 1 WHERE bookname = $1 AND authorname = $2 RETURNING *',
            [checkings.bookname, checkings.authorname]
        );
        
        return NextResponse.json({ message: 'Checking deleted successfully' });
    } catch (error) {
        return new NextResponse('Failed to delete checking', { status: 500 });
    } finally {
        client.release();
    }
}
