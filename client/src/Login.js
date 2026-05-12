import React, { useState } from "react";
import axios from "axios";

function Login({ setShowRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
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

            alert("Login failed");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <div className="flex flex-col gap-4">

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
                        onClick={login}
                        className="bg-blue-500 text-white py-2 rounded-lg"
                    >
                        Login
                    </button>

                    <p className="text-center">

                        Don't have an account?

                        <button
                            onClick={() => setShowRegister(true)}
                            className="text-blue-500 ml-2"
                        >
                            Register
                        </button>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;