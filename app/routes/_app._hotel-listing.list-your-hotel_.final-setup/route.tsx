import { Link } from "@remix-run/react";
import { Button } from "~/app/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "~/app/components/ui/card";

export default function FinalSetup() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Final Setup</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>

            <CardContent>
                Thank you for providing your hotel information. We'll be in
                touch shortly to verify the details you've shared and grant you
                access to your personalized dashboard. This dashboard will
                empower you to enhance your profile with additional information,
                such as room details and services offered, as well as
                conveniently track your customers' bookings, transactions and
                your earnigs to.
            </CardContent>

            <CardFooter>
                <Link to="/settings">
                    <Button>Finish listing</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
