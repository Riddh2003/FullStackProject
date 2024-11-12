import React from "react";
import RoyalLogo from "../../assets/image/logo_white-1.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
const Navbar = ({
    onSearch,
    searchResults,
    onStudentSelect,
    showDropdown,
    onAddStudentClick
}) => {
    return (
        <div className="h-auto flex items-center justify-between bg-[#ff4848] p-3">
            <div className="pl-10 w-56">
                <img src={RoyalLogo} alt="Logo" className="h-12 cursor-pointer" />
            </div>
            <div className="relative md:flex md:w-[30%] items-center lg:w-[50%] hidden">
                <div className="flex items-center w-full max-w-md mx-auto bg-white border rounded-full shadow-sm">
                    <div className="p-2">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 text-gray-700 rounded-r-full focus:outline-none"
                        onChange={(e)=>onSearch(e.target.value)}
                    />
                </div>
                {/* Dropdown for search results */}
                {showDropdown && searchResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 z-50">
                        <ul>
                            {searchResults.map((student) => (
                                <li
                                    key={student.studentId}
                                    className="p-2 hover:bg-gray-100"
                                    onClick={() => onStudentSelect(student.studentId)}
                                >
                                    {student.firstName} {student.lastName} - {student.college}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center ">
                <div className="md:pr-10 ">
                    <button
                        onClick={onAddStudentClick}
                        className="text-md shadow-lg font-semibold bg-white text-[#ff4848] hover:bg-[#ffa4a4] hover:text-white py-2 px-4 rounded-full ease-in duration-200"
                    >
                        Add Student
                    </button>
                </div>
                <div className="md:pr-10 ">
                    <button
                        className="text-md shadow-lg font-semibold bg-white text-[#ff4848] hover:bg-[#ffa4a4] hover:text-white py-2 px-4 rounded-full ease-in duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>

    );
}
export default Navbar;