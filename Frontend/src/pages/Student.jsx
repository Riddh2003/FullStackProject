// Student.jsx
import React, { useState} from "react";
import Navbar from "../components/student/Navbar.jsx";
import StudentDetails from "../components/student/StudentDetails.jsx";
import AddStudent from "../components/student/AddStudent.jsx";

function Student() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);

    // Fetch data from the API when the component mounts
    // Function to fetch student data with JWT token
    const fetchStudentData = async (query) => {
        if (!query) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }
        try {
            setLoading(true);
            const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken'); // Replace this with the actual token or a state/prop variable containing the token
            const response = await fetch(`http://localhost:9999/api/private/admin/searchStudent?prefix=${query}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setSearchResults(data);
                setShowDropdown(true);
            } else {
                setError("No results found.")
                setShowDropdown(false);
            }
        } catch (err) {
            setError("Error fetching student."); // Handle errors and set the error state
            setShowDropdown(false);
        } finally {
            setLoading(false);
        }
    };
    const fetchStudentById = async (studentId) => {
        try {
            const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken'); // Retrieve the JWT token securely

            const response = await fetch(`http://localhost:9999/api/private/admin?studentId=${studentId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setSelectedStudent(data);
                setShowDropdown(false);
            } else {
                setError("No student found with the given ID.");
            }
        } catch (err) {
            setError("Error :: ", err); // Handle errors and set the error state
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(query);
        fetchStudentData(query);
    };

    const handleStudentSelect = (studentId) => {
        fetchStudentById(studentId);
    };

    const toggleAddStudentModel = () => {
        setShowAddStudentModal(!showAddStudentModal);// toggle model visibility
    }

    return (
        <div className="font-metropolis flex flex-col lg:h-screen md:h-[100%] overflow-hidden w-full relative scrollbar-hidden bg-[#ffa4a432]">
            <Navbar 
                onSearch={handleSearch}
                searchResults={searchResults}
                onStudentSelect={handleStudentSelect}
                showDropdown={showDropdown}
                onAddStudentClick={toggleAddStudentModel}
            />
            {loading &&(
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
                    <span className="loading loading-spinner text-xl"></span>
                </div>
            )}
            <StudentDetails student={selectedStudent}/>
            {
                showAddStudentModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <AddStudent onClose={()=> setShowAddStudentModal(false)}/>
                    </div>
            )}
        </div>
    );
}
export default Student;