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
  // salt should be the user's email
  const salt = await bcrypt.hash(validatedInput.email, 5);
  // hash the password
  const hashedPassword = await bcrypt.hash(validatedInput.password, salt );
  const role: string = getRole(validatedInput.email);
  try {
    // first make a new user in the users table with the email since it is unique
    await client.query(
      `INSERT INTO "User" (email, role, hashedpassword) VALUES ($1, $2, $3) RETURNING email`,
      [validatedInput.email, role, hashedPassword]
    );

    // Return the result
    return { success: true, "role": role, message: 'Signup successful' };
  } catch (error) {
    // Handle any errors
    throw new Error('Signup failed');
  } finally {
    // Release the database client
    client.release();
  }
};


export async function POST(req: Request) {
    try {
        // Get and parse the input from the request body
        // Call the signup function with the input
        const input = await req.json();
        const result = await signup(input);
        // Return a success response
        return new Response(JSON.stringify(result), { status: 200 });


      
    } catch (error) {
        // Return an error response
        return new Response(JSON.stringify({ error: "failed to signup" }), { status: 400 });
    }
}


function getRole(email: string) {
  if (email === "religion.amherst.edu") {
    return "admin";
    // else if email has a number in it in the last two digits before @ then it is a student
  } else if (email.match(/\d{2}@/)) {
    return "student";
  } else {
    return "faculty";
  }

}