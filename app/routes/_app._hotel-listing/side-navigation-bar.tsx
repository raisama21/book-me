import { NavLink } from "@remix-run/react";

export default function SideNavigationBar() {
    return (
        <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
        >
            <NavLink
                to="/list-your-hotel"
                className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                }
            >
                General
            </NavLink>
            <NavLink
                to="/list-your-hotel/hotel-information"
                className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                }
            >
                Hotel Info
            </NavLink>
            <NavLink
                to="/list-your-hotel/hotel-address"
                className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                }
            >
                Hotel Address
            </NavLink>
            <NavLink
                to="/list-your-hotel/final-setup"
                className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                }
            >
                Final Setup
            </NavLink>
        </nav>
    );
}
