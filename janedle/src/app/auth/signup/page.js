'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import addData from "@/firestore/addData";

function Page() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [name, setName] = React.useState('');
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();

        if (password !== password2) {
            alert("Passwords do not match");
            setPassword('');
            setPassword2('');
            return;
        }

        var { result, error } = await signUp(email, password);

        if (error) {
            alert(error.message)
            return console.log(error);
        }

        // else successful
        console.log(result);

        ({result, error} = await addData("users", result.user.uid, {
            email,
            name,
        }));

        if (error) {
            alert(error.message)
            return console.log(error);
        }

        console.log(result);

        return router.push("/");
    };

    return (
        <div className="flex flex-col wrapper justify-center items-center w-screen text-center h-screen gap-4">
            <div className="form-wrapper">
                <div className="adaptive-text-lg">Janedle</div>
                <div className="flex-col mt-4">
                    <form onSubmit={handleForm} className="form">
                        <label htmlFor="email">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <div className="adaptive-text-md my-1">Email</div>
                                <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" className="rounded-lg p-1" />
                            </div>
                        </label>
                        <label htmlFor="Name">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <div className="adaptive-text-md my-1">Name</div>
                                <input onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="ex: John Aidan" className="rounded-lg p-1" />
                            </div>
                        </label>
                        <label htmlFor="password">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <div className="adaptive-text-md my-1">Password</div>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" className="rounded-lg p-1" />
                            </div>
                        </label>
                        <label htmlFor="password2">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <div className="adaptive-text-sm my-2">Re-Enter Password</div>
                                <input value={password2} onChange={(e) => setPassword2(e.target.value)} required type="password" name="password2" id="password2" placeholder="re-enter password" className="rounded-lg p-1" />
                            </div>
                        </label>
                        <div className="flex flex-col justify-center text-center items-center mx-auto mt-4 w-2/3">
                            <button type="submit" className="custom-button" style={{backgroundColor : "cyan"}}>Sign up</button>
                            <hr className="border-1 border-white w-full my-4"></hr>
                            <a href="/auth/signin" className="text-white">Already have an account?<div className="text-blue">Sign in here!</div></a>        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;