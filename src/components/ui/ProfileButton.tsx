import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';
import Link from "next/link";
import { getCurrentUser } from "../../../actions/getCurrentUser";

const ProfileButton = () => {
    const { data: session } = useSession();
    const userAdmin = getCurrentUser();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        {/* <AvatarImage src={session?.user?.image || "/img/default-avatar.jpg"} /> */}
                        <AvatarImage src={session?.user?.image || ""} />
                        <AvatarFallback>{session?.user?.name?.charAt(0) || 'CN'}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {session ? (
                        <>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/orders"><DropdownMenuItem className="cursor-pointer">Orders</DropdownMenuItem></Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    signOut({ redirect: false });
                                    toast.success("Logged out successfully");
                                }}
                            >
                                Log Out
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <Link href={"/login"}><DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem></Link>
                            <Link href={"/register"}><DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem></Link>
                        </>
                    )}
                    {session?.user?.email === 'admin@gmail.com' ? (
                        <>
                            <DropdownMenuSeparator />
                            <Link href="/admin"><DropdownMenuItem className="cursor-pointer">Admin</DropdownMenuItem></Link>
                        </>
                    ) : (
                        <>
                            
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    );
};

export default ProfileButton;


