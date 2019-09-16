import { Module, HttpService, HttpModule } from '@nestjs/common';
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
  controllers: [HotelController],
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),
    HttpModule.register({
      timeout: 18000,
      maxRedirects: 5,
    }),
  ],
  exports: [HotelService],
})
export class HotelModule {}
