import React, { useState } from "react";
import axios from "axios";

function Register({ setShowRegister }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Registration failed");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded-lg"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-lg"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded-lg"
                    />

                    <button
                        onClick={register}
                        className="bg-blue-500 text-white py-2 rounded-lg"
                    >
                        Register
                    </button>

                    <p className="text-center">

                        Already have an account?

                        <button
                            onClick={() => setShowRegister(false)}
                            className="text-blue-500 ml-2"
                        >
                            Login
                        </button>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;