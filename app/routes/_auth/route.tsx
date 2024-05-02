import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { authCookie } from "~/app/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const cookieString = request.headers.get("Cookie");
    const userId = await authCookie.parse(cookieString);
    if (userId) {
        throw redirect("/home");
    }

    return null;
}

export default function AuthLayout() {
    return (
        <main className="flex min-h-screen flex-col justify-center">
            <Outlet />
        </main>
    );
}
