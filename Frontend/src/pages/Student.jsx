import React from "react";
import Navbar from "../components/student/Navbar.jsx";
import StudentDetails from "../components/student/StudentDetails.jsx";

function Student() {
    return (
        <div className="h-screen w-screen bg-[#ffa4a432]">
            <Navbar />
            <StudentDetails />
        </div>
    )
}
export default Student;