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
import authentication, {
    LoginFormSchema,
    validate,
} from "~/app/lib/actions/user/authentication";
import { authCookie } from "~/app/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const loginData = Object.fromEntries(formData) as z.infer<
        typeof LoginFormSchema
    >;

    const errors = await validate(loginData);
    if (errors) {
        return json({ state: errors });
    }

    const user = await authentication(loginData);

    return redirect("/home", {
        headers: {
            "Set-Cookie": await authCookie.serialize(user.userId),
        },
    });
}

export default function Login() {
    const data = useActionData<typeof action>();

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form method="POST" className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
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
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                to="#"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
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
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
