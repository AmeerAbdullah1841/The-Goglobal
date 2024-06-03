"use client";

import { useState, useEffect } from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { db } from "@/config/db/firebase";
import { collection, getDoc, doc } from "firebase/firestore";

interface User {
    password: string;
    type: string;
    name: string;
    status?: string;
    date?: string;
}


export default function APanelLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            alert("Email is required");
            return;
        }

        if (!password) {
            alert("Password is required");
            return;
        }
        const q: any = collection(db, "user");
        const q2 = doc(q, email);
        const querySnapshot = await getDoc(q2);

        if (!querySnapshot.exists()) {
            alert("User not found");
            return;
        }

        const data = querySnapshot.data() as User;
        if (data.password !== password) {
            alert("Invalid password");
            return;
        }

        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/apanel/dashboard";
    }

    useEffect(() => {
        localStorage.removeItem("user");
    }
        , []);

    return (
        <section className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Your password" required />
                                    <button type="button" className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeFilled className="w-5 h-5" /> : <EyeInvisibleFilled className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <button type="button" onClick={signIn}
                                className="w-full py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}