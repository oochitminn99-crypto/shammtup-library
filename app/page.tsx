"use client";

import UserButton from "@/components/user-button"
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

const Home = () => {

  return (
    <div>
      <SessionProvider>
        <UserButton />
      </SessionProvider>

      <h1 className="text-center text-2xl text-fuchsia-800 font-bold">
        Home Page
      </h1><br />
      <br />
      <Link href={"/products"} className="text-2xl bg-fuchsia-800 font-bold underline">
        All Product
      </Link>
    </div>
  )
}

export default Home;