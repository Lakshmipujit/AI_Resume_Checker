import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/resume/my-resumes",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setResumes(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <div className="p-8 bg-gray-100 min-h-screen">

            <h1 className="text-3xl font-bold mb-6">
                My Resume History
            </h1>

            <div className="grid gap-4">

                {resumes.map((resume) => (

                    <div
                        key={resume._id}
                        className="bg-white shadow-lg rounded-xl p-4"
                    >

                        <h2 className="text-xl font-bold">
                            Score: {resume.score}
                        </h2>

                        <p className="mt-2">
                            Skills:
                            {" "}
                            {resume.extractedSkills.join(", ")}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Dashboard;