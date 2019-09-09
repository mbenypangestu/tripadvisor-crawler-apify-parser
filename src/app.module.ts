import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './spider/hotel/hotel.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hotel_tripinfo', 
      { useNewUrlParser: true }
    ),
    HotelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
