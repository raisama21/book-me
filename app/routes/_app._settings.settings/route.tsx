import { Link } from "@remix-run/react";
import { Button } from "~/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/app/components/ui/card";
import { Checkbox } from "~/app/components/ui/checkbox";
import { Input } from "~/app/components/ui/input";

export default function Settings() {
    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Add your hotel</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        Ready to showcase your property to millions of potential
                        guests? Add your hotel to our platform and start
                        maximizing your bookings today! Reach a wider audience,
                        increase your revenue, and manage your listings
                        effortlessly.
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>
                        <Link to="/list-your-hotel">List your hotel</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
