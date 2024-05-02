import sql from "~/db/connect";
import * as argon from "argon2";
import z from "zod";
import { User } from "~/app/lib/defitions";

export const SignupFormSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, { message: "first name required" })
        .min(3, { message: "first name must be at lease 3 character long" }),
    lastName: z
        .string()
        .trim()
        .min(1, { message: "last name required" })
        .min(3, { message: "last name must be at lease 3 character long" }),
    email: z
        .string()
        .trim()
        .min(1, { message: "email required" })
        .email({ message: "invalid email" }),
    password: z
        .string()
        .trim()
        .min(1, { message: "password required" })
        .min(8, { message: "password must be at lease 8 character long" })
        .max(64, { message: "password must be at most 64 character long" }),
});

export async function validate(data: z.infer<typeof SignupFormSchema>) {
    const formFields = SignupFormSchema.safeParse({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
    });

    if (!formFields.success) {
        return {
            errors: formFields.error.flatten().fieldErrors,
        };
    }

    const { email } = formFields.data;

    const [user] = await sql<User[]>`
        SELECT * FROM users WHERE email = ${email}
    `;

    if (email === user?.email) {
        return {
            errors: {
                email: ["user already exists"],
            },
        };
    }
}

export default async function createUser(
    data: z.infer<typeof SignupFormSchema>
) {
    const { firstName, lastName, email, password } = data;

    const hash = await argon.hash(password);

    try {
        await sql`
        INSERT INTO users (firstname, lastname, email, password)
        VALUES (${firstName}, ${lastName}, ${email}, ${hash})
        `;
    } catch (error: any) {
        console.log(error);
    }
}
