import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { URL_HOTELS_BY_LOCATION } from '../../utils/constants';
import { Hotel } from '../hotel/hotel.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Review) private readonly repo: Repository<Review>,
  ) {}

  async createMany(hotel: Hotel): Promise<any> {
    const hotelID = hotel.location_id;
    let url = URL_HOTELS_BY_LOCATION + hotelID + '/reviews';
    let next = false;

    do {
      try {
        let response = await this.apiService.grabReviewByHotelLocationId(
          url,
          hotel.location_id,
        );

        console.log(response);

        break;

        const hotels = response.data;
        const paging = response.paging;
        if (paging.next != null) {
          next = true;
          url = paging.next;
        } else next = false;
      } catch (error) {
        console.log('Failed to save hotel from location ID : ' + hotelID);
        console.log(error + '\n');
        break;
      }
    } while (next);
  }
}
