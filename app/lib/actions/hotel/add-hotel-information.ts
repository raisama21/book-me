import z from "zod";
import sql from "~/db/connect";

export const HotelFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Hotel name requried" })
        .min(3, { message: "Hotel name must be at lease 3 character long" }),
    description: z
        .string()
        .trim()
        .min(1, { message: "Hotel description requried" })
        .min(20, {
            message: "Hotel description must be at lease 20 character long",
        }),
});

export async function validate(
    data: z.infer<typeof HotelFormSchema>,
    userId: string
) {
    const formField = HotelFormSchema.safeParse({
        name: data.name,
        description: data.description,
    });

    if (!formField.success) {
        return {
            errors: formField.error.flatten().fieldErrors,
        };
    }

    const { name } = formField.data;

    const [hotel] = await sql<{ id: string; name: string }[]>`
        SELECT id, name FROM hotel WHERE user_id = ${userId}
    `;

    if (hotel?.name === name) {
        return {
            errors: {
                name: ["Hotel name already in use"],
            },
        };
    }
}

export default async function addHotelInformation(
    data: z.infer<typeof HotelFormSchema>,
    userId: string
) {
    const { name, description } = data;

    try {
        await sql`
            INSERT INTO hotel (user_id, name, description) 
            VALUES (${userId}, ${name}, ${description})
        `;
    } catch (error) {
        console.log(error);
    }
}
