import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import Header from "./header";
import { requireAuth } from "~/app/cookies.server";
import getUser from "~/app/lib/data/get-user";

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuth(request);

    const user = await getUser(userId);
    if (!user) {
        return;
    }

    return { user };
}

export default function AppLayout() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <>
            <Header user={user} />

            <Outlet />
        </>
    );
}
