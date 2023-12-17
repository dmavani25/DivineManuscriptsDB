import { getClient } from 'db/db';
import { NextRequest, NextResponse } from 'next/server';


import { z } from 'zod';

// Define the input validation schema using Zod
const loginInputSchema = z.object({
    email: z.string().email(),
});

export async function DELETE (req: NextRequest) {
    const client = await getClient();
    try {
        const input  = await req.json();
        const validatedInput = loginInputSchema.parse(input);
        const email = validatedInput.email;
        const result = await client.query('DELETE FROM "User" WHERE email = $1 RETURNING *', [email]);

        if (result.rows.length === 0) {
            return new NextResponse('User not found', { status: 404 });
        } else {
            return NextResponse.json({ success: true, message: 'User deleted'  }, {status: 200});
        }
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 });
    } finally {
        client.release();
    }
};
