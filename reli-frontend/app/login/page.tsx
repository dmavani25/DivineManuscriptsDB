"use client"

import Navbar from 'app/nav-bar/Navbar';
import React, { useState } from 'react';
import { AuthError } from 'next-auth';
import { signIn } from 'auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const authenticate = async (formData: any) => {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            setError('Invalid credentials.');
            break;
          default:
            setError('Something went wrong.');
            break;
        }
      } else {
        console.error('Non-authentication error occurred:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError(''); // Clear any existing errors

    const formData = {
      email,
      password,
    };

    await authenticate(formData);
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 mt-4 text-left shadow-lg rounded-md outline outline-1 ">
          <h3 className="text-2xl font-bold text-center">Log In</h3>
          <p className="px-4 py-4 text-s text-[#667185]">
            Enter your credentials to access your account
          </p>

          {/* Display error message if there is one */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-[#F56630]"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-[#F56630]"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <a href="#" className="text-sm text-[#F56630] hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="flex items-baseline justify-between mt-4">
                <button
                  type="submit"
                  data-ripple-light="true"
                  className="mb-2 block w-full text-primary border border-solid border-primary rounded px-6 pb-2 pt-2.5 text-s font-medium leading-normal transition duration-150 ease-in-out hover:bg-primary hover:text-[#fff] focus:bg-primary-600 focus:outline-none active:bg-primary-700 "
                >
                  Log In
                </button>
              </div>

              <div className="text-sm text-center mt-4">
                <p className="text-gray-600">
                  Are you new here?{' '}
                  <a href="/signup" className="text-[#F56630] hover:underline">
                    Create Account
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
