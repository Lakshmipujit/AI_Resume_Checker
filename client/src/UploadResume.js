import React, { useState } from "react";
import axios from "axios";

function UploadResume() {

    const [file, setFile] = useState(null);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const logout = () => {

        localStorage.removeItem("token");

        window.location.reload();
    };

    const uploadFile = async () => {

        if (!file) {

            alert("Please select a resume file first");

            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("resume", file);

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/resume/upload",
                formData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setResult(res.data);

        } catch (err) {

            console.log(err);

            alert("Upload failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white shadow-2xl rounded-2xl p-8 w-[500px]">

                <div className="flex justify-end mb-4">

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

                <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
                    AI Resume Analyzer
                </h1>

                <div className="flex flex-col gap-4">

                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="border p-2 rounded-lg"
                    />

                    <button
                        onClick={uploadFile}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
                    >

                        {loading ? "Analyzing..." : "Upload Resume"}

                    </button>

                </div>

                {result && (

                    <div className="mt-8 bg-gray-50 p-4 rounded-xl">

                        <h2 className="text-2xl font-bold text-green-600">
                            ATS Score: {result.score}
                        </h2>

                        <div className="mt-4">

                            <h3 className="font-bold text-lg">
                                Matched Skills
                            </h3>

                            <ul className="list-disc ml-6">

                                {result.matched_skills?.map(
                                    (skill, index) => (

                                        <li key={index}>
                                            {skill}
                                        </li>
                                    )
                                )}

                            </ul>

                        </div>

                        <div className="mt-4">

                            <h3 className="font-bold text-lg text-red-500">
                                Missing Skills
                            </h3>

                            <ul className="list-disc ml-6">

                                {result.missing_skills?.map(
                                    (skill, index) => (

                                        <li key={index}>
                                            {skill}
                                        </li>
                                    )
                                )}

                            </ul>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default UploadResume;