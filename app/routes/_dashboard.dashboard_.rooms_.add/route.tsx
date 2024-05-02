import { Form } from "@remix-run/react";
import { Button } from "~/app/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";

export default function Add() {
    return (
        <main className="p-8">
            <Form>
                <Card>
                    <CardHeader>
                        <CardTitle>Add Room</CardTitle>
                        <CardDescription>
                            You can add your room information and services here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Label></Label>
                            <Input type="text" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Add Room</Button>
                    </CardFooter>
                </Card>
            </Form>
        </main>
    );
}
