
import { NextRequest, NextResponse } from 'next/server';
import {query, getClient,} from '../../../db/db';

export default async function checkingsHandler(req: NextRequest) {
  if (req.method === 'GET') {
    return getCheckings(req);
  } else if (req.method === 'POST') {
    return createChecking(req.body);
  } else if (req.method === 'PUT') {
    return updateChecking(req.body);
  } else if (req.method === 'DELETE') {
    return deleteChecking(req.body);
  } else {
    return new NextResponse('Method not allowed', { status: 405 });
  }
}

async function getCheckings(req: NextRequest) {
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


async function createChecking(checkingData: any) {
const client = await getClient();
  try {
    const { checkedoutsince, useremail, bookname, authorname } = checkingData;
    const query = 'INSERT INTO checkings (checkedoutsince, useremail, bookname, authorname) VALUES ($1, $2, $3, $4)';
    const values = [checkedoutsince, useremail, bookname, authorname];
    await client.query(query, values);
    return NextResponse.json({ message: 'Checking created successfully' });
  } catch (error) {
    return new NextResponse('Failed to create checking', { status: 500 });
  } finally {
    client.release();
  }
}

async function updateChecking(checkingData: any) {
    const client = await getClient()
  try {
    const { checkedoutsince, useremail, bookname, authorname } = checkingData;
    const query = 'UPDATE checkings SET checkedoutsince = $1 WHERE useremail = $2 AND bookname = $3 AND authorname = $4';
    const values = [checkedoutsince, useremail, bookname, authorname];
    await client.query(query, values);
    return NextResponse.json({ message: 'Checking updated successfully' });
  } catch (error) {
    return new NextResponse('Failed to update checking', { status: 500 });
  } finally{
        client.release();
  }
}

async function deleteChecking(checkingData: any) {

    const client = await getClient();
    try {
    const { useremail, bookname, authorname } = checkingData;
    const query = 'DELETE FROM checkings WHERE useremail = $1 AND bookname = $2 AND authorname = $3';
    const values = [useremail, bookname, authorname];
    await client.query(query, values);
    return NextResponse.json({ message: 'Checking deleted successfully' });
  } catch (error) {
    return new NextResponse('Failed to delete checking', { status: 500 });
  } finally {
    client.release();
  }

}
