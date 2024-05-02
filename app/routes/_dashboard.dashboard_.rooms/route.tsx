import { Link } from "@remix-run/react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/app/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/app/components/ui/card";
import { Button } from "~/app/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function Rooms() {
    return (
        <main className="p-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Room Information</CardTitle>
                        <CardDescription></CardDescription>

                        <Link to="/dashboard/rooms/add">
                            <Button>
                                <span>Add Room</span>
                                <PlusIcon />
                            </Button>
                        </Link>
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type Of Room</TableHead>
                                <TableHead>Price Of Room</TableHead>
                                <TableHead>Booked Room</TableHead>
                                <TableHead>Available Room</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
