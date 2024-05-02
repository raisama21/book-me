import sql from "~/db/connect";
import { User } from "../defitions";

export default async function getUser(userId: string) {
    try {
        const [user] = await sql<User[]>`
            SELECT * FROM users WHERE id = ${userId};
       `;

       return user;
    } catch (error) {
        console.log(error);
    }
}
