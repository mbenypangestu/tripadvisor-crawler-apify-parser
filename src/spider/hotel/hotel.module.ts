import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from './schema/hotel.schema';
import { DatabaseModule } from 'src/database/database.module';
import { hotelProviders } from './hotel.providers';

@Module({
  providers: [
    HotelService,
    ...hotelProviders
  ],
  controllers: [HotelController],
  imports: [
    DatabaseModule
  ]
})
export class HotelModule {}
