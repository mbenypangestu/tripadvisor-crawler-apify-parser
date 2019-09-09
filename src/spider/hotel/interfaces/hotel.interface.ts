import { Document } from 'mongoose';

export interface Hotel extends Document {
    readonly location_id : string;
    readonly name : string;
}