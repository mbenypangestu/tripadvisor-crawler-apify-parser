import {
  Injectable,
  Inject,
  HttpService,
  BadRequestException,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { IHotel } from './interfaces/hotel.interface';
import { Location } from '../location/location.entity';
import { ApiService } from '../api/api.service';
import { URL_HOTELS_BY_LOCATION } from '../../utils/constants';
import { ReviewService } from '../review/review.service';

@Injectable()
export class HotelService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Hotel) private readonly repo: Repository<Hotel>,
    private readonly reviewService: ReviewService,
  ) {}

  async getAllHotel(): Promise<Hotel[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async getHotelByLocHotelID(loc_hotel_id: string): Promise<Hotel> {
    try {
      return await this.repo.findOne({ where: { location_id: loc_hotel_id } });
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async isHotelExist(loc_hotel_id: string) {
    try {
      const data = this.repo.findOne({
        where: { location_id: loc_hotel_id },
      });
      console.log(data);
      if (data !== null || data !== undefined) return true;
      else return false;
    } catch (error) {
      throw new BadRequestException('Failed to get data hotel !');
    }
  }

  async create(dto: CreateHotelDto): Promise<Hotel> {
    try {
      const save = await this.repo.save(dto);

      if (save) {
        console.log('Saved ! Hotel (' + dto.location_id + ') - ' + dto.name);
        return save;
      }
    } catch (error) {
      console.log('Failed to save hotel with loc hotel id: ' + dto.location_id);
      console.log(error + '\n');
      throw new BadRequestException('Failed to save data !');
    }
  }

  async createMany(loc: Location): Promise<any> {
    const locationID = loc._id;

    let url = URL_HOTELS_BY_LOCATION + loc.location_id + '/hotels';
    let next = false;

    do {
      try {
        let response = await this.apiService.grabHotelByLocation(url, loc);
        const hotels = response.data;
        const paging = response.paging;

        await Promise.all(
          hotels.map(async hotel => {
            let is_hotel_exist = await this.isHotelExist(hotel.location_id);
            let date_now: Date = new Date();

            console.log('Status : ' + is_hotel_exist);

            if (!is_hotel_exist) {
              const hotelCreate = { ...hotel, locationID, date_now };
              await this.create(hotelCreate);

              const hotelByLocHotelId = await this.getHotelByLocHotelID(
                hotelCreate.location_id,
              );
              await this.reviewService.createMany(hotelByLocHotelId);
            } else
              console.log('Hotel = ' + hotel.name + ' is already exist !\n');
          }),
        );

        if (paging.next != null) {
          next = true;
          url = paging.next;
        } else next = false;
      } catch (error) {
        console.log('Failed to save hotel from location ID : ' + locationID);
        console.log(error + '\n');
        break;
      }
    } while (next);
  }
}
