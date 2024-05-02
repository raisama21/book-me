import "dotenv/config";
import { createCookie, redirect } from "@remix-run/node";
import sql from "~/db/connect";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
    console.warn("No COOKIE_SECRET set, the app is insecure");

    secret = "default-secret";
}

export let authCookie = createCookie("__auth", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [secret],
    maxAge: 60 * 60 * 24 * 3, // 3 days
});

export async function requireAuth(request: Request) {
    const cookieString = request.headers.get("Cookie");
    const userId = await authCookie.parse(cookieString);

    if (!userId) {
        throw redirect("/login", {
            headers: {
                "Set-Cookie": await authCookie.serialize("", {
                    maxAge: 0,
                }),
            },
        });
    }

    return userId;
}

export async function requireAdminAuth(request: Request) {
    const cookieString = request.headers.get("Cookie");
    const userId = await authCookie.parse(cookieString);

    const [user] = await sql<{ admin: boolean }[]>`
       SELECT admin FROM users WHERE id = ${userId};
    `;

    if (!user.admin) {
        throw redirect("/home");
    }
}
