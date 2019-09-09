import * as mongoose from 'mongoose';
import { async } from 'rxjs/internal/scheduler/async';

export const databaseProviders = [
    {
        provide : 'DATABASE_CONNECTION',
        useFactory : async () : Promise<typeof mongoose> => 
            await mongoose.connect('mongodb://localhost:27017/hotel_tripinfo'),
    },
];