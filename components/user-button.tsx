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
        <nav>
            <h1 className="text-xl text-fuchsia-700 font-bold italic ms-2.5">
                My Web
            </h1>
            {
                session ? (
                    <div>
                        <div className="outline-none relative float-right p-4 md:p-8">
                            <div className="flex gap-4 items-center">
                                <span>{session.user?.name}</span>
                                <div className="size-10 hover:opacity-75 transition">
                                    <Image src={`session.user?.image||undefined`} alt='' width={20} height={20} />
                                </div>
                                <div className="bg-sky-900 text-white">
                                    {avatarFallback}
                                </div>
                            </div>
                        </div>
                        <div className="w-52">
                            <div className="h-10" onClick={() => handleSignOut()}>
                                Log Out
                            </div>
                        </div>
                    </div>
                ) : (

                    <div className="flex justify-end p-4 gap-4">
                        <button className="bg-mauve-600 text-white font-semibold px-3.5 py-0 rounded-sm cursor-pointer hover:scale-110 hover:bg-mauve-900">
                            <Link href={"/sign-in"} className="mb-1.5">Sign In</Link>
                        </button>
                        <button className="bg-mauve-600 text-white font-semibold px-3.5 py-0 rounded-sm cursor-pointer hover:scale-110 hover:bg-mauve-900">
                            <Link href={"/sign-up"} className="mb-1.5">Sign Up</Link>
                        </button>
                    </div>
                )
            }
        </nav>
    )
}

export default UserButton;