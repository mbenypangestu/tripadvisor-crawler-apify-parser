import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './spider/hotel/hotel.module';
import { LocationModule } from './spider/location/location.module';
import { join } from 'path';
import { DatabaseModule } from './config/database/database.module';
import { ConfigModule, ConfigService } from 'nestjs-dotenv';
import { HotelService } from './spider/hotel/hotel.service';
import { LocationService } from './spider/location/location.service';
import { Location } from './spider/location/location.entity';
import { ScheduleModule } from 'nest-schedule';
import { ApiModule } from './spider/api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'hotel_tripinfo',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TypeOrmModule.forFeature([Location]),
    ScheduleModule.register(),
    HotelModule,
    LocationModule,
    DatabaseModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocationService],
  exports: [LocationService],
})
export class AppModule {}
