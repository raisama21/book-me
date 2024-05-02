import { Link } from "@remix-run/react";
import { BellIcon } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import { Button } from "~/app/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/app/components/ui/avatar";
import { User } from "~/app/lib/defitions";

export default function Header({ user }: { user: User }) {
    return (
        <nav className="text-text border-primary-border flex h-16 w-full items-center border-b px-8 shadow-md">
            <h2 className="cursor-pointer text-2xl font-bold">
                <Link to="/home">Book Me</Link>
            </h2>

            <div className="ml-auto mr-4 cursor-pointer">
                <BellIcon className="h-6 w-6" />
            </div>

            <div className="mr-6">
                <Link
                    to="/book-a-room"
                    className="border-primary-button block h-10 rounded-md border bg-red-400 px-4 font-bold text-white"
                >
                    <div className="mx-4 flex h-full">
                        <span className="self-center">Book a room</span>
                    </div>
                </Link>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                    >
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/settings">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link to="/settings/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    {user.admin && (
                        <Link to="/dashboard">
                            <DropdownMenuItem>Dashboard</DropdownMenuItem>
                        </Link>
                    )}
                    <DropdownMenuSeparator />
                    <Link to="/list-your-hotel">
                        <DropdownMenuItem>List Your Hotel</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
}
