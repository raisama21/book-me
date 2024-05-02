import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

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
import { Label } from "~/app/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/app/components/ui/select";
import { requireAuth } from "~/app/cookies.server";
import addHotelAddress, {
    validate,
} from "~/app/lib/actions/hotel/add-hotel-address";
import { getHotelAddress } from "~/app/lib/data/hotel";

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireAuth(request);

    const hotelAddress = await getHotelAddress(userId);

    return json({ hotelAddress });
}

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireAuth(request);
    const formData = await request.formData();

    const hotelAddress = {
        streetAddress: String(formData.get("streetAddress")),
        city: String(formData.get("city")),
        provience: String(formData.get("provience")),
        postalCode: Number(formData.get("postalCode")),
    };

    const errors = validate(hotelAddress);
    if (errors) {
        return json({ state: errors });
    }

    await addHotelAddress(hotelAddress, userId);

    return redirect("/list-your-hotel/final-setup");
}

export default function HotelAddress() {
    const actionData = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();

    const provience = [
        "provience 1",
        "madhesh pradesh",
        "bagmati province",
        "gandaki",
        "lumbini",
        "karnali",
        "sudurpaschim",
    ];

    return (
        <Form method="POST" className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Hotel Address</CardTitle>
                    <CardDescription>
                        Your can list your hotel address here.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="streetAddress">
                                    Street Address
                                </Label>
                                <Input
                                    type="text"
                                    id="streetAddress"
                                    name="streetAddress"
                                    placeholder="Mahendra Rajmarga"
                                    defaultValue={
                                        loaderData.hotelAddress?.street_address
                                    }
                                />
                            </div>

                            {actionData?.state?.errors.streetAddress && (
                                <div>
                                    <p className="pl-2 text-xs font-medium text-red-500">
                                        {
                                            actionData?.state?.errors
                                                .streetAddress[0]
                                        }
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="city">City/Town</Label>
                                <Input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Bardghat"
                                    defaultValue={loaderData.hotelAddress?.city}
                                />

                                {actionData?.state?.errors.city && (
                                    <div>
                                        <p className="pl-2 text-xs font-medium text-red-500">
                                            {actionData?.state?.errors.city[0]}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input
                                    type="number"
                                    id="postalCode"
                                    name="postalCode"
                                    placeholder="33011"
                                    defaultValue={
                                        loaderData.hotelAddress?.postal_code
                                    }
                                />
                                {actionData?.state?.errors.postalCode && (
                                    <div>
                                        <p className="pl-2 text-xs font-medium text-red-500">
                                            {
                                                actionData?.state?.errors
                                                    .postalCode[0]
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="province">Province</Label>
                                <Select
                                    name="provience"
                                    defaultValue={
                                        loaderData?.hotelAddress?.provience
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="provience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {provience.map((item) => (
                                            <SelectItem
                                                key={item}
                                                value={item}
                                                className="capitalize"
                                            >
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {actionData?.state?.errors.provience && (
                                <div>
                                    <p className="pl-2 text-xs font-medium text-red-500">
                                        {actionData?.state?.errors.provience[0]}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <div>
                        <Button
                            disabled={loaderData?.hotelAddress ? true : false}
                        >
                            Add Hotel Address
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </Form>
    );
}
