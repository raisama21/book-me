import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

async function seedUsers() {
    try {
        await sql`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                firstName VARCHAR(64) NOT NULL,
                lastName VARCHAR(64) NOT NULL,
                email VARCHAR(64) NOT NULL UNIQUE,
                password VARCHAR(128) NOT NULL,

                PRIMARY KEY (id)
            );
        `;

        console.log("Created 'users' table");
    } catch (error) {
        console.log("error while seeding users: ", error);
    }
}

async function seedHotelInformation() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS hotel (
            id UUID NOT NULL DEFAULT uuid_generate_v4(),
            user_id UUID NOT NULL,
            name VARCHAR(256) NOT NULL UNIQUE,
            description VARCHAR(256) NOT NULL,

            PRIMARY KEY (id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `;

        console.log("Created 'hotel' table");
    } catch (error) {
        console.log("error while seeding hotel information: ", error);
    }
}

async function seedHotelAddress() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS hotel_address (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                hotel_id UUID NOT NULL,
                street_address VARCHAR(256) NOT NULL,
                city VARCHAR(256) NOT NULL,
                provience VARCHAR(256) NOT NULL,
                postal_code NUMERIC(5) NOT NULL,

                PRIMARY KEY (id),
                FOREIGN KEY (hotel_id) REFERENCES hotel(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `;

        console.log("Created 'hotel_address' table");
    } catch (error) {
        console.log("error while seeding hotel address: ", error);
    }
}

async function seedRooms() {
    try {
        await sql`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
                   CREATE TYPE booking_status as ENUM (
                       'available',
                       'reserved', 
                       'confirmed', 
                       'cancelled', 
                       'checked-in', 
                       'checked-out',
                       'maintenance'
                   );
                END IF; 
            END$$;
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS rooms (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                hotel_id UUID NOT NULL,
                type_of_room VARCHAR(256) NOT NULL,
                amenities VARCHAR(256) NOT NULL,
                status booking_status NOT NULL DEFAULT 'available', 

                PRIMARY KEY (id),
                FOREIGN KEY (hotel_id) REFERENCES hotel(id)
            )
        `;

        console.log("Crated 'rooms' table");
    } catch (error) {
        console.log("error while seedng room: ", error);
    }
}

async function main() {
    await seedUsers();
    await seedHotelInformation();
    await seedHotelAddress();
    await seedRooms();

    sql.end();
}

main();
