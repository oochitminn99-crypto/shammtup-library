"use client";

import UserButton from "@/components/user-button"
import {SessionProvider} from "next-auth/react";

const Home = () => {

  return (
    <div>
      <SessionProvider>
        <UserButton />
      </SessionProvider>

      <h1 className="text-center text-2xl text-fuchsia-800 font-bold">
        Home Page
      </h1>
    </div>
  )
}

export default Home;