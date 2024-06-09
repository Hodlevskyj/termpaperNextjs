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

const ProfileButton = () => {
    const { data: session } = useSession(); 

    return (
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
                        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">Subscription</DropdownMenuItem>
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileButton;
