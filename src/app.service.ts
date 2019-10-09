import { Injectable } from '@nestjs/common';
import { NestSchedule, Cron } from 'nest-schedule';
import { LocationService } from './app/spider/location/location.service';
import { HotelService } from './app/spider/hotel/hotel.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class AppService extends NestSchedule {
  constructor(
    private readonly locationService: LocationService,
    private readonly hotelService: HotelService,
  ) {
    super();
  }
  @Cron('0 20 0 * * *', {
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  })
  async saveAllHotel() {
    console.log('=============== Starting Cron Job ===============');
    const locs = await this.locationService.findAll();

    let i = 0;
    const waitFor = ms => new Promise(r => setTimeout(r, ms));
    const asyncForEach = async (index, array, callback) => {
      for (index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    };

    const saveHotels = async () => {
      await asyncForEach(i, locs, async loc => {
        await waitFor(1);

        await this.hotelService.createMany(loc);
      });
    };
    saveHotels();

    // try {
    //   await Promise.all(
    //     locs.map(async (loc, i) => {
    //       await this.hotelService.createMany(loc);
    //     }),
    //   );
    // } catch (error) {
    //   console.log('Failed to create all hotels');
    // }
  }
}
