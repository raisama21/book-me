import { IndianRupeeIcon, CreditCardIcon, UsersIcon } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/app/components/ui/card";

export default function CardWrapper() {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Revenue
                    </CardTitle>
                    <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Customers
                    </CardTitle>
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+100</div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                    </p>
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Booked Rooms
                    </CardTitle>
                    <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+5</div>
                    <p className="text-xs text-muted-foreground">
                        available rooms +10
                    </p>
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Pending Payment
                    </CardTitle>
                    <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+5</div>
                    <p className="text-xs text-muted-foreground">
                        +₹8900 pending
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
