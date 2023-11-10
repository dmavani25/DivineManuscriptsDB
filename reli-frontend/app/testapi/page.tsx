import { getClient, query } from 'db/db';
import React from 'react'

export async function getBooks() {
    const client = await getClient();
    try {
        const { rows } = await query(`SELECT * FROM public.book`); // PUT QUERIES HERE
        return { data: rows };
    } catch (error) {
        const message = (error as Error).message;
        return { error: message };
    } finally {
        client.release();
    }
}

const page = async () => {
    const { data, error } = await getBooks();

    if (error || !data) {
        return <div>Error: {error}</div>;
    }

    const books = data.map((book: any) => {
        return (
            <div key={book.id}>
                <p>{book.title}</p>
            </div>
        );
    }
    );
  return (
    {books}
  )
}

export default page