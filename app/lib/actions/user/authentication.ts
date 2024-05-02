import sql from "~/db/connect";
import * as argon from "argon2";
import z from "zod";
import { User } from "../defitions";

export const LoginFormSchema = z.object({
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

export async function validate(data: z.infer<typeof LoginFormSchema>) {
    const formField = LoginFormSchema.safeParse({
        email: data.email,
        password: data.password,
    });

    if (!formField.success) {
        return {
            errors: formField.error.flatten().fieldErrors,
        };
    }

    const { email, password } = formField.data;

    const [user] = await sql<User[]>`
        SELECT * FROM users WHERE email = ${email}
    `;

    if (email !== user?.email) {
        return {
            errors: {
                email: ["email or password is wrong"],
                password: ["email or password is wrong"],
            },
        };
    }

    const verify = await argon.verify(user.password, password);

    if (!verify) {
        return {
            errors: {
                email: ["email or password is wrong"],
                password: ["email or password is wrong"],
            },
        };
    }
}

export default async function authentication(
    data: z.infer<typeof LoginFormSchema>
) {
    const { email } = data;

    const [user] = await sql<User[]>`
        SELECT * FROM users WHERE email = ${email}
    `;

    return { userId: user.id };
}
