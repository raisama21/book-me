import { Outlet } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

import Header from "./header";
import { requireAdminAuth } from "~/app/cookies.server";

export async function loader({request}: LoaderFunctionArgs) {
    await requireAdminAuth(request);

    return null;
}

export default function DashboardLayout() {
    return (
        <>
            <Header />

            <Outlet />
        </>
    );
}
