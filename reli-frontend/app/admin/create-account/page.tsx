'use client';
import Sidebar from 'app/custom-components/side-bar/admin/Sidebar';
import Navbar from 'app/nav-bar/Navbar';
import { User } from 'db/db-types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignUp = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const router = useRouter();

  const [addUserError, setUserError] = useState('');
  const [addUserSuccess, setAddUserSuccess] = useState('')

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  async function postUser(url = '../api/signup', method : string, data : any) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const res = await response.json();
        console.log(JSON.stringify(res));


        return res;
        
    } catch (error) {
      // console.log(error);
        return null;
    }
  }

  const handleAddUser = (e: any) => {
    setUserError('');
    e.preventDefault();

    const user : any = {
        email : userEmail,
        password : userPassword
    }

    
    postUser('../api/signup', 'POST', user).then(
      (res) => {
        setAddUserSuccess("User signed up")
        // reload

        router.replace("/admin/manage-users")
      }
    ).catch((err) => {
      // console.log(err);
      setUserError("Something went wrong");
    })

    // toggle add book Props
  };



  return (
    <div>
      <div
        className={`w-1/5 transition-all duration-300 ease-in-out overflow-hidden ${
          showSidebar ? 'block translate-x-0 ' : 'hidden translate-x-full'
        }`}
      >
        {/** create a side bar  */}
        <Sidebar show={showSidebar} setter={setShowSidebar} />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="px-8 py-6 mt-4 text-left shadow-lg rounded-md outline outline-1 ">
          <h3 className="text-2xl font-bold text-center">Sign Up</h3>
          <p className="px-4 py-4 text-s text-[#667185]">
            Create your credentials for a new user
          </p>

          {addUserError && <div className="text-[#ff3333] text-center">{addUserError}</div>}
          {addUserSuccess && <div className="text-[#458246] text-center">{addUserSuccess}</div>}
          <form onSubmit={handleAddUser}>
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
                  onChange={(e) => setUserEmail(e.target.value)}
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
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>

              <div className="flex items-baseline justify-between mt-4">
                <button
                  type="submit"
                  data-ripple-light="true"
                  className="mb-2 block w-full text-primary border border-solid border-primary rounded px-6 pb-2 pt-2.5 text-s font-medium leading-normal transition duration-150 ease-in-out hover:bg-primary hover:text-[#fff] focus:bg-primary-600 focus:outline-none active:bg-primary-700 "
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
