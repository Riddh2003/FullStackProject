export default function SignUp() {
    return (
        <div className="w-full p-6 sm:p-12 bg-white shadow-xl rounded-lg">
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-2xl xl:text-4xl font-extrabold text-[#ff4848]">
                        Sign Up
                    </h1>
                </div>
                <div className="w-full flex-1 mt-8">
                    <div className="mx-auto max-w-xs flex flex-col gap-4">
                        <input
                            className="w-full px-5 py-3 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff4848] focus:bg-white"
                            type="text"
                            placeholder="Enter your name"
                        />
                        <input
                            className="w-full px-5 py-3 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff4848] focus:bg-white"
                            type="email"
                            placeholder="Enter your email"
                        />
                        <input
                            className="w-full px-5 py-3 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff4848] focus:bg-white"
                            type="tel"
                            placeholder="Enter your phone"
                        />
                        <input
                            className="w-full px-5 py-3 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff4848] focus:bg-white"
                            type="password"
                            placeholder="Password"
                        />
                        <button className="mt-5 tracking-wide font-semibold bg-[#ff4848] text-white w-full py-4 rounded-lg hover:bg-[#e03e3e] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg
                                className="w-6 h-6 -ml-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Sign Up</span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Already have an account?{" "}
                            <a href="">
                                <span className="text-[#ff4848] font-semibold">Sign in</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}