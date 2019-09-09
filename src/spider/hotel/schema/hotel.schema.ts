import * as mongoose from 'mongoose';

export const HotelSchema = new mongoose.Schema({
    location_id : String,
    name : String
})