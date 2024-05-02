export type User = {
    id: string;
    firstName: string;
    lastname: string;
    email: string;
    password: string;
    admin: boolean;
};

export type HotelInformation = {
    id: string;
    user_id: string;
    name: string;
    description: string;
}

export type HotelAddress = {
    id: string;
    user_id: string;
    hotel_id: string;
    street_address: string;
    city: string;
    provience: string;
    postal_code: string;
};
