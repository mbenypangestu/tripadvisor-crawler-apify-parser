import { Injectable, Inject, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './interfaces/hotel.interface';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { map } from 'rxjs/operators';
import { Constants } from '../../utils/constants';

@Injectable()
export class HotelService {
  constructor(
    private readonly http: HttpService,
    @InjectModel('Hotel') private readonly model: Model<Hotel>,
  ) {}

  async getHotelByLocId(loc_id: number) {
    return await this.http
      .get(
        'https://api.tripadvisor.com/api/internal/1.14/location/' +
          loc_id +
          '/hotels',
        {
          headers: Constants.HEADER_TRIPADVISOR_API_REQ,
        },
      )
      .pipe(
        map(response => {
          return response.data;
        }),
      );
  }

  async create(dto: CreateHotelDto): Promise<Hotel> {
    let process = new this.model(dto);
    return await process.save();
  }
}
