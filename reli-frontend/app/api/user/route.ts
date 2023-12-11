import { NextApiRequest, NextApiResponse } from 'next';
import { getClient, query } from 'db/db';
import { NextRequest, NextResponse } from 'next/server';


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

    let queryString = 'SELECT * FROM "User"';
    if (whereClauses.length > 0) {
        queryString += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    const client = await getClient();
    try {
        const result = await client.query(queryString, queryParams);
        if (result.rows.length === 0) {
            return new NextResponse('User not found', { status: 404 });
        } else {
            return NextResponse.json(result.rows);
        }
    } catch (error) {
        return new NextResponse(String(error), { status: 500 });
    } finally {
        client.release();
    }
};


export async function POST (req: NextRequest) {
    const client = await getClient();
    try {
        const searchParams = req.nextUrl.searchParams; 
        const email = searchParams.get('email');
        const role = searchParams.get('role');
        if (!email || !role) {
            return new NextResponse('Email and role are required', { status: 400 });
        }
        const result = await query('INSERT INTO "User" (email, role) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING * ', [email, role]);
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    } finally {
        client.release();
    }
};

export async function PUT (req: NextRequest) {
    const client = await getClient();
    try {
        
        const searchParams = req.nextUrl.searchParams; 
        const email = searchParams.get('email');
        const role = searchParams.get('role');

        if (!email || !role) {
            return new NextResponse('Email and role are required', { status: 400 });
        }

        const result = await query('UPDATE "User" SET role = $1 WHERE email = $2 RETURNING *', [role, email]);
        if (result.rows.length === 0) {
            return new NextResponse('User not found', { status: 404 });
        } else {
            return NextResponse.json(result.rows[0]);
        }
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    } finally {
        client.release();
    }
};

export async function DELETE (req: NextRequest) {
    const client = await getClient();
    try {
        const searchParams = req.nextUrl.searchParams; 
        const email = searchParams.get('email');
        const result = await query('DELETE FROM "User" WHERE email = $1 RETURNING *', [email]);

        if (result.rows.length === 0) {
            return new NextResponse('User not found', { status: 404 });
        } else {
            return NextResponse.json(result.rows[0]);
        }
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    } finally {
        client.release();
    }
};
