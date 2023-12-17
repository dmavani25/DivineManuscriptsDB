// api/login/route.ts

import { getClient } from '../../../db/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';

// Define the input validation schema using Zod
const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// Define the login API endpoint
export const login = async (input: any) => {
    // Validate the input using the schema

    const validatedInput = loginInputSchema.parse(input);
    // Access the database
    const client = await getClient();
    try {
        // Retrieve the user by email
        const res = await client.query(
            `SELECT hashedpassword, role FROM "User" WHERE email = $1`,
            [validatedInput.email]
        );
        const user = res.rows[0];
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the hashed passwords match
        const isValid = await bcrypt.compare(validatedInput.password, user.hashedpassword);
        if (!isValid) {
            throw new Error('Invalid password');
        }
        // Return the success response
        return { success: true, email: validatedInput.email, role: user.role, message: 'Login successful' };
    } catch (error) {
        // Handle any errors
        return { success: false, message: "Failed to login. If this persists, contact IT for support" };
    } finally {
        // Release the database client
        client.release();
    }
};

export async function POST(req: Request) {
    try {
        // Get and parse the input from the request body
        const input = await req.json();
        const result = await login(input);
        // Return a success response
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        // Return an error response
        return new Response(JSON.stringify({ error: "failed to login" }), { status: 400 });
    }
}
