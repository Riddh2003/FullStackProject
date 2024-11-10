import Login from "../components/common/Login.jsx";
import React, { useState } from 'react';
import Signup from "../components/common/SignUp.jsx"; // corrected import statement

export default function Home() {
    const [showSignup, setShowSignup] = useState(false);
    return (
        <div className="font-metropolis h-screen w-screen flex item-center justify-center flex-col md:flex-row transition-all ease-linear">
            <div className="h-full w-full flex items-center justify-center p-10 md:w-[50%] md:p-5 transition-all ease-linear">
                <Login />
            </div>
            <div className="h-full w-full flex justify-center items-center text-white bg-gradient-to-r from-[#ffa4a4] to-[#ff4848] md:w-[50%] flex-col transition-al ease-linear">
                <div className={`h-44 flex items-center justify-evenly flex-col text-center p-5 gap-4`}>
                    <h1 className="text-3xl font-bold">New Here ?</h1>
                    <p className="text-base font-medium">
                        Signup and discover a greate amount of new opportunities!
                    </p>
                    <button className="ease-in duration-200 text-center bg-white p-3 mt-5 text-[#ff4848] pl-8 pr-8 rounded-full font-bold text-lg"
                        onClick={() => setShowSignup(true)}
                    >
                        Sign up
                    </button>
                </div>
            </div>
            {showSignup && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-2xl rounded-lg p-4 relative">
                        <Signup/>
                        <div
                            className="absolute top-6 right-6 cursor-pointer rounded-full shadow-lg p-2 text-white bg-[#ff4848] hover:bg-[#e03e3e] transition-colors duration-200"
                            onClick={() => setShowSignup(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}