// //api/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { getClient } from '../../../db/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
// Define the input validation schema using Zod
const signupInputSchema = z.object({
    email: z.string().email(),
  password: z.string().min(6),
});

// Define the signup API endpoint
export const signup = async (input: any) => {
  // Validate the input using the schema
  const validatedInput = signupInputSchema.parse(input);

  // Access the database using pgclient's useClient
  const client = await getClient();

  // hash the password
    const hashedPassword = await bcrypt.hash(validatedInput.password, 10);

  try {
    // first make a new user in the users table with the email since it is unique
    await client.query(
      `INSERT INTO "Users" (email, password) VALUES ($1, $2) RETURNING email`,
      [validatedInput.email, hashedPassword]
    );

    // Return the result
    return { success: true, message: 'Signup successful' };
  } catch (error) {
    // Handle any errors
    console.error('Signup error:', error);
    throw new Error('Signup failed');
  } finally {
    // Release the database client
    client.release();
  }
};


export async function POST(req: Request) {
    try {
        console.log("POST");
        // Get and parse the input from the request body
        // Call the signup function with the input
        const input = await req.json();
        const result = await signup(input);
        
        
        // Return the result with a success status code
        return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
        // Return an error response
        return new Response(JSON.stringify({ error: "failed to signup" }), { status: 400 });
    }
}
