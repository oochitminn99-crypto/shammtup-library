import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuLoaderCircle } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

const UserButton = () => {

    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <LuLoaderCircle className="size-6 mr-4 mt-4 float-right animate-spin" />
        )
    }

    const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push("/")
    }

    return (
        <nav className="bg-pink-300 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-12 items-center">
                    <div className=" flex shrink-0">
                        <h1 className="text-xl text-fuchsia-700 font-bold italic ms-2.5">
                            My Web
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {
                            session ? (
                                <div className="flex justify-end space-x-3">
                                    
                                        
                                            <span>{session.user?.name}</span>
                                            <div className="size-10 hover:opacity-75 transition rounded-full">
                                                <Image src={`session.user?.image||undefined`} alt='' width={20} height={20} />
                                            </div>
                                            <div className="flex bg-sky-900 text-white w-5 h-5 rounded-full items-center justify-center">
                                                {avatarFallback}
                                            </div>
                                        
                                    
                                    <div>
                                        <div className="bg-mauve-600 text-white font-semibold px-3.5 py-0 rounded-sm cursor-pointer hover:scale-110 hover:bg-mauve-900" onClick={() => handleSignOut()}>
                                            Log Out
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <div className="flex justify-end p-4 gap-4">
                                    <button className="bg-mauve-600 text-white font-semibold px-3.5 py-0 rounded-sm cursor-pointer hover:scale-110 hover:bg-mauve-900">
                                        <Link href={"/sign-in"} className="mb-2.5">Sign In</Link>
                                    </button>
                                    <button className="bg-mauve-600 text-white font-semibold px-3.5 py-0 rounded-sm cursor-pointer hover:scale-110 hover:bg-mauve-900">
                                        <Link href={"/sign-up"} className="mb-2.5">Sign Up</Link>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default UserButton;