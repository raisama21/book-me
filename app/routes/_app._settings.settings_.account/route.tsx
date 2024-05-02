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

export default function Account() {
    return (
        <Form className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                        <Input
                            type="password"
                            name="password"
                            placeholder="password"
                        />
                </CardContent>
            </Card>

            <div>
                <Button>Change password</Button>
            </div>
        </Form>
    );
}
