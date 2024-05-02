import sql from "~/db/connect";
import { HotelInformation, HotelAddress } from "~/app/lib/defitions";

export async function getHotelInformation(userId: string) {
    try {
        const [hotelInfo] = await sql<HotelInformation[]>`
            SELECT name, description FROM hotel WHERE user_id = ${userId}
        `;

        return hotelInfo;
    } catch (error) {
        console.log(error);
    }
}

export async function getHotelAddress(userId: string) {
    try {
        const [hotelAddress] = await sql<HotelAddress[]>`
            SELECT * FROM hotel_address WHERE user_id = ${userId};
        `;

        return hotelAddress;
    } catch (error) {
        console.log(error);
    }
}
