import { Injectable, HttpService } from '@nestjs/common';
import { IHotel } from '../hotel/interfaces/hotel.interface';
import {
  URL_HOTELS_BY_LOCATION,
  HEADER_TRIPADVISOR_API_REQ,
} from '../../utils/constants';
import { IResponseHotel } from './interfaces/response-hotel.interface';
import { IReview } from '../review/interfaces/review.interface';

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

  async grabReviewByHotelLocationId(
    url: string,
    hotel_loc_id: string,
  ): Promise<IResponseHotel<IReview>> {
    try {
      const reviews = await this.http
        .get<IResponseHotel<IReview>>(url, {
          headers: HEADER_TRIPADVISOR_API_REQ,
        })
        .toPromise();
      return reviews.data;
    } catch (error) {
      console.log(
        'Failed to retrieve data review from hotel (location) id : ' +
          hotel_loc_id,
      );
      console.log(error + '\n');
    }
  }
}
