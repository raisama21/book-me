import { NavLink } from "@remix-run/react";

export default function SideNavigationBar() {
    return (
        <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
        >
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                }
            >
                General
            </NavLink>
            <NavLink
                to="/settings/profile"
                className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                }
            >
                Profile
            </NavLink>
            <NavLink
                to="/settings/account"
                className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                }
            >
                Account
            </NavLink>
        </nav>
    );
}
