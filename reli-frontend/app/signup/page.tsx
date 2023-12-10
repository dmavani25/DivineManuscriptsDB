import Navbar from 'app/nav-bar/Navbar';
import React from 'react';

const SignUp = () => {
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 mt-4 text-left shadow-lg rounded-md outline outline-1 ">
          <h3 className="text-2xl font-bold text-center">
            Sign Up 
          </h3>
          <p
          className="px-4 py-4 text-s text-[#667185]"
          >Create your credentials to sign up for an account</p>
          <form action="">
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
                />
              </div>

              <div className="flex items-baseline justify-between mt-4">
                <button
                  type="button"
                  data-ripple-light="true"
                  className="mb-2 block w-full text-primary border border-solid border-primary rounded px-6 pb-2 pt-2.5 text-s font-medium leading-normal transition duration-150 ease-in-out hover:bg-primary hover:text-[#fff] focus:bg-primary-600 focus:outline-none active:bg-primary-700 "
                >
                  Sign Up
                </button>
              </div>

              <div className="text-sm text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-[#F56630] hover:underline">
                    Log In
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

export default SignUp;
