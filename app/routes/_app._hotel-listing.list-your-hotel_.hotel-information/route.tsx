import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Label } from "@radix-ui/react-label";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import clsx from "clsx";

import { Button } from "~/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Textarea } from "~/app/components/ui/textarea";
import addHotelInformation, {
    validate,
} from "~/app/lib/actions/hotel/add-hotel-information";
import { requireAuth } from "~/app/cookies.server";
import { getHotelInformation } from "~/app/lib/data/hotel";

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuth(request);
    const hotelInfo = await getHotelInformation(userId);

    return json({ hotelInfo });
}

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireAuth(request);
    const formData = await request.formData();

    const name = String(formData.get("name"));
    const description = String(formData.get("description"));

    const errors = await validate({ name, description }, userId);
    if (errors) {
        return json({ state: errors });
    }

    await addHotelInformation({ name, description }, userId);

    return redirect("/list-your-hotel/hotel-address");
}

export default function HotelInformation() {
    const actionData = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();

    return (
        <Form method="POST" className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Hotel Information</CardTitle>
                    <CardDescription>
                        Your can list your hotel information here.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="enter your hotel name here."
                                    defaultValue={loaderData.hotelInfo?.name}
                                />
                            </div>
                            {actionData?.state?.errors.name && (
                                <div>
                                    <p className="pl-2 text-xs font-medium text-red-500">
                                        {actionData?.state?.errors.name[0]}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Enter your hotel description here."
                                    defaultValue={
                                        loaderData.hotelInfo?.description
                                    }
                                ></Textarea>
                            </div>
                            {actionData?.state?.errors.description && (
                                <div>
                                    <p className="pl-2 text-xs font-medium text-red-500">
                                        {
                                            actionData?.state?.errors
                                                .description[0]
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <div>
                        <Button disabled={loaderData.hotelInfo ? true : false}>
                            Add Hotel Information
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </Form>
    );
}
