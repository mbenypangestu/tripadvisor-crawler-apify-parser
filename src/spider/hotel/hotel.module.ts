import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from './schema/hotel.schema';
import { hotelProviders } from './hotel.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  providers: [
    HotelService,
    // ...hotelProviders
  ],
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema, }])
  ],
  controllers: [HotelController],
  exports : [
    HotelService,
  ]
})
export class HotelModule {}
