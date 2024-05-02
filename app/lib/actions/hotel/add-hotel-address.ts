import z from "zod";
import sql from "~/db/connect";

export const HotelAddressFormSchema = z.object({
    streetAddress: z
        .string()
        .trim()
        .min(1, { message: "street address required" }),
    city: z
        .string()
        .trim()
        .min(1, { message: "city required" })
        .min(3, { message: "city required" }),
    provience: z
        .string()
        .trim()
        .min(1, { message: "provience required" })
        .min(3, { message: "provience required" }),
    postalCode: z.number().min(1, { message: "postal code required" }),
});

export function validate(data: z.infer<typeof HotelAddressFormSchema>) {
    const formField = HotelAddressFormSchema.safeParse({
        streetAddress: data.streetAddress,
        city: data.city,
        provience: data.provience,
        postalCode: data.postalCode,
    });

    if (!formField.success) {
        return {
            errors: formField.error.flatten().fieldErrors,
        };
    }
}

export default async function addHotelAddress(
    data: z.infer<typeof HotelAddressFormSchema>,
    userId: string
) {
    const { streetAddress, city, provience, postalCode } = data;

    try {
        const [hotel] = await sql<{ id: string }[]>`
            SELECT id FROM hotel WHERE user_id = ${userId}
        `;

        await sql`
            INSERT INTO hotel_address (user_id, hotel_id, street_address, city, provience, postal_code)
            VALUES (${userId}, ${hotel.id}, ${streetAddress}, ${city}, ${provience}, ${postalCode})
        `;
    } catch (error) {
        console.log(error);
    }
}
