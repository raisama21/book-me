import { Outlet } from "@remix-run/react";

import SideNavigationBar from "./side-navigation-bar";

export default function SettingsLayout() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Hotel Listing</h1>
                    <div className="text-sm text-muted-foreground">
                        <p>Are you an hotel owner?</p>
                        <p>
                            Your can list your hotel here and reach to more
                            customers.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <SideNavigationBar />

                    <Outlet />
                </div>
            </main>
        </div>
    );
}
