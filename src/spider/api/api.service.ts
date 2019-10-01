import { Injectable, HttpService } from '@nestjs/common';
import { IHotel } from '../hotel/interfaces/hotel.interface';
import {
  URL_HOTELS_BY_LOCATION,
  HEADER_TRIPADVISOR_API_REQ,
} from '../../utils/constants';
import { IResponseHotel } from './interfaces/response-hotel.interface';

@Injectable()
export class ApiService {
  constructor(private readonly http: HttpService) {}

  async grabHotelByLocation(
    url: string,
    loc_id: string,
  ): Promise<IResponseHotel<IHotel>> {
    try {
      const hotels = await this.http
        .get<IResponseHotel<IHotel>>(url, {
          headers: HEADER_TRIPADVISOR_API_REQ,
        })
        .toPromise();
      return hotels.data;
    } catch (error) {
      console.log('Failed to retrieve data hotel from location id : ' + loc_id);
    }
  }
}
