import React from "react";
import Piechart from "../student/PieChart.jsx";
import { CameraIcon } from "@heroicons/react/24/outline";
import RoyalLogo from "../../assets/image/logo_white-1.png";
import StudentProgress from "../student/StudentProgress.jsx";
import SimpleBarChart from "../student/SimpleBarChart.jsx";

const StudentDetails = ({ student }) => {
    const defaultStudent = {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        mobileNo: "",
        collegeName: "",
        finalScore: "",
        discipline: 5,
        regularSessions: 4,
        communicationInSessions: 4,
        testPerformance: 4,
    }
    // Use default data if no student data is provided
    const currentStudent = student || defaultStudent;

    const totalScore =
        parseInt(currentStudent.discipline) +
        parseInt(currentStudent.regularSessions) +
        parseInt(currentStudent.communicationInSessions) +
        parseInt(currentStudent.testPerformance);

    const finalScorePercentage = (totalScore / 20) * 100;
    currentStudent.finalScore = finalScorePercentage;
    console.log(currentStudent.finalScore);

    const progressData = [
        {
            id: 1,
            value: currentStudent.testPerformance,
            size: "md",
            label: "Test Performance",
        },
        {
            id: 2,
            value: currentStudent.discipline,
            size: "md",
            label: "Discipline",
        },
        {
            id: 3,
            value: currentStudent.regularSessions,
            size: "md",
            label: "Regularity",
        },
        {
            id: 4,
            value: currentStudent.communicationInSessions,
            size: "md",
            label: "Communication",
        }
    ];

    const uData = [
        currentStudent.discipline,
        currentStudent.testPerformance,
        currentStudent.regularSessions,
        currentStudent.communicationInSessions,
    ];

    // Criteria array for performance table
    const criteria = [
        { label: "Test Performance", key: "testPerformance", id: 1 },
        { label: "Communication", key: "communicationInSessions", id: 2 },
        { label: "Regularity", key: "regularSessions", id: 3 },
        { label: "Discipline", key: "discipline", id: 4 },
    ];


    return (
        <div id="student-details" className="h-[100%] w-full p-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 scrollbar-hidden">
            {/* Left column for student details */}
            <div className="h-full w-full bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#ff4848] mb-6">
                    Student Details
                </h2>
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-[#ff8d8d] text-white text-3xl rounded-full flex items-center justify-center">
                            {currentStudent.firstName && currentStudent.lastName ?
                                currentStudent.firstName.charAt(0) + currentStudent.lastName.charAt(0) :
                                "P"}{currentStudent.firstName ? currentStudent.firstName.charAt(0) : "P"}
                        </div>
                        <CameraIcon className="absolute bottom-0 right-0 w-6 h-6 text-gray-700 cursor-pointer" />
                    </div>
                </div>
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                        <span className="font-semibold">Name:</span>{" "}
                        {currentStudent.firstName + " " + currentStudent.lastName || ""}
                    </div>
                    <div>
                        <span className="font-semibold">College:</span>{" "}
                        {currentStudent.collegeName || ""}
                    </div>
                    <div>
                        <span className="font-semibold">Batch:</span>{" "}
                        {currentStudent.batch || ""}
                    </div>
                    <div>
                        <span className="font-semibold">Mobile:</span>{" "}
                        {currentStudent.mobileNo || ""}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span>{" "}
                        {currentStudent.email || ""}
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Marks</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-md">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Subject</th>
                                <th className="py-2 px-4 border-b">Marks</th>
                                <th className="py-2 px-4 border-b">Out of</th>
                                <th className="py-2 px-4 border-b">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criteria.map((criterion) => (
                                <tr key={criterion.key}>
                                    <td className="py-2 px-4 border-b">{criterion.label}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {currentStudent[criterion.key] || "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">5</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {"★★★★★".slice(0, currentStudent[criterion.key])}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Right Column */}
            <div className="h-full w-full rounded-lg grid grid-cols-2 lg:grid-cols-4 gap-2 sm:grid-cols-2">
                {/* First Component */}
                <div className="w-full bg-white rounded-md flex flex-col justify-around items-center lg:col-span-2 md:col-span-1 max-sm:col-span-3 sm:col-span-3">
                    <h3 className="text-md font-semibold">Score Percentage</h3>
                    <div className="h-[180px] w-[180px]">
                        <Piechart finalScore={currentStudent.finalScore} />
                    </div>
                    <p className="text-xl font-bold mt-2">
                        {currentStudent.finalScore || "N/A"}&#x25;
                    </p>
                </div>

                {/* Second Component */}
                <div className="w-ful bg-white rounded-md lg:col-span-2 md:col-span-3 max-sm:col-span-3 sm:col-span-3">
                    <div className="flex w-full flex-col justify-between gap-7 p-4">
                        <h3 className="text-md text-center font-semibold">Activities & Conduct</h3>
                        <div className="h-auto flex flex-col">
                            {progressData.map((data) => (
                                <div key={data.id} className="mb-5">
                                    <h4>{data.label}</h4>
                                    <StudentProgress value={data.value * 20} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Third Component (Increased Width) */}
                <div className="w-full bg-white rounded-md lg:col-span-4 md:col-span-4 max-sm:col-span-3 sm:col-span-3">
                    {/* Added col-span-2 to increase width */}
                    <h3 className="text-center mt-4 text-md font-semibold">Marks Distribution</h3>
                    <div className="flex justify-center">
                        <SimpleBarChart uData={uData} />
                    </div>
                </div>

                {/* Fourth Component */}
                <div className="w-full bg-white rounded-md flex justify-center items-center lg:hidden max-sm:col-span-3 md:col-span-4 sm:col-span-3">
                    <img src={RoyalLogo} alt="Logo" className="h-12 lg:w-[70%] lg:h-15" />
                </div>
            </div>
        </div>
    )
}
export default StudentDetails;