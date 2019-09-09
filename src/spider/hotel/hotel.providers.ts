import { HotelSchema } from "./schema/hotel.schema";
import { Connection } from "mongoose";

export const hotelProviders = [
    {
        provide : 'HOTEL_MODEL',
        useFactory : (connection : Connection) => connection.model('hotel', HotelSchema),
        inject : ['DATABASE_CONNECTION'],
    }
]