import { Form } from "@remix-run/react";
import { Button } from "~/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";

export default function Profile() {
    return (
        <Form className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>First Name</CardTitle>
                    <CardDescription>
                        Update your first name here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                    />
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Last Name</CardTitle>
                    <CardDescription>
                        Update your last name here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="Last Name"
                    />
                </CardContent>
            </Card>

            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Email Address</CardTitle>
                    <CardDescription>
                        Update your email address here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                    />
                </CardContent>
            </Card>

            <div>
                <Button>Update Profile</Button>
            </div>
        </Form>
    );
}
