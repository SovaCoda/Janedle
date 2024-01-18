'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();

        const { result, error } = await signIn(email, password);

        if (error) {
            alert("Invalid email/password")
            return console.log(error);
        }

        // else successful
        console.log(result);
        
        return router.push("/");
    };

    return (
        <div className="flex flex-col wrapper justify-center items-center w-screen text-center h-screen gap-4">
            <div className="form-wrapper">
                <div className="adaptive-text-lg">Janedle</div>
                <div className="flex-col mt-4">
                    <form onSubmit={handleForm} className="">
                        <label htmlFor="email">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <div className="adaptive-text-md my-1">Email</div>
                                <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="rounded-lg p-1" />
                            </div>
                        </label>
                        <label htmlFor="password">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <div className="adaptive-text-md">Password</div>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="rounded-lg p-1" />
                            </div>
                        </label>
                        <div className="flex flex-col justify-center text-center items-center mx-auto mt-4 w-2/3">
                            <button type="submit" className="custom-button" style={{backgroundColor : "cyan"}}>Sign in</button>
                            <hr className="border-1 border-white w-full my-4"></hr>
                            <a href="/auth/signup" className="text-white">Don't have an account? <div className="text-blue">Sign up here!</div></a>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;