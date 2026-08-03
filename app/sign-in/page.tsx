"use client";

import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        })
        if(res?.ok) {
            router.push("/dashboard");
            alert("login successfully");
        } else if(res?.status === 400) {
            setError("Invalid Credentials");
            setPending(false)
        } else {
            alert("No Register");
            setError("Something went wrong Or No Register");
        }
    }

    return (
        <div>
            <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                    <h1 className="text-xl font-bold my-4">
                        Sign In
                    </h1>

                    {!!error && (
                        <div className="bg-pink-200 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                            <p className="text-fuchsia-900 font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 space-y-1.5">

                        <input type="email" disabled={pending} placeholder="xxxx@gmail.com" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-slate-300" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required />
                        <br /><br />

                        <input type="password" disabled={pending} placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-300" required />
                        <br /><br />
                        
                        <button type="submit" disabled={pending} className="bg-green-600 text-white font-bold cursor-pointer px-6 py-1 rounded-sm hover:bg-green-900">
                            continue
                        </button>

                        <Link href={"/sign-up"} className="text-md mt-2 me-3 text-right">
                            Already have an account?
                            <span className="underline underline-offset-2 text-blue-600 font-semibold ms-2.5">
                                Register
                            </span>
                        </Link>
                    </form>
                </div>
            </div>


        </div>

    )

}