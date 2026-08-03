"use client";

import UserButton from "@/components/user-button"
import {SessionProvider} from "next-auth/react";

export default function DashboardPage() {
    return (
        <div>
            <div>
                <SessionProvider>
                    <UserButton />
                </SessionProvider>
            </div>
            <div className="text-center text-2xl text-fuchsia-800 font-bold">
                <h1>Dashboard Page</h1>
            </div>
        </div>
    )
}