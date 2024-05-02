import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { z } from "zod";

import { Button } from "~/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import createUser, {
    SignupFormSchema,
    validate,
} from "~/app/lib/actions/user/create-user";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const signupData = Object.fromEntries(formData) as z.infer<
        typeof SignupFormSchema
    >;

    const errors = await validate(signupData);
    if (errors) {
        return json({ state: errors });
    }

    await createUser(signupData);

    return redirect("/login");
}

export default function Signup() {
    const data = useActionData<typeof action>();

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form method="POST" className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="Max"
                            />
                            {data?.state?.errors.firstName && (
                                <div>
                                    <p className="pl-2 text-xs font-medium text-red-500">
                                        {data?.state?.errors.firstName[0]}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Robinson"
                            />
                            {data?.state?.errors.lastName && (
                                <div>
                                    <p className="pl-2 text-xs font-medium text-red-500">
                                        {data?.state?.errors.lastName[0]}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="max@example.com"
                        />
                        {data?.state?.errors.email && (
                            <div>
                                <p className="pl-2 text-xs font-medium text-red-500">
                                    {data?.state?.errors.email[0]}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" />
                        {data?.state?.errors.password && (
                            <div>
                                <p className="pl-2 text-xs font-medium text-red-500">
                                    {data?.state?.errors.password[0]}
                                </p>
                            </div>
                        )}
                    </div>
                    <Button type="submit" className="w-full">
                        Create an account
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign up with Google
                    </Button>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline">
                        Log in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
