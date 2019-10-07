import { Injectable, BadRequestException } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { URL_HOTELS_BY_LOCATION } from '../../utils/constants';
import { Hotel } from '../hotel/hotel.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Review) private readonly repo: Repository<Review>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    try {
      const save = await this.repo.save(dto);

      if (save) {
        console.log('Saved ! Review ' + dto.id + ' - ' + dto.title);
        return save;
      }
    } catch (error) {
      console.log('Failed to save review with review id: ' + dto.id);
      console.log(error + '\n');
      throw new BadRequestException('Failed to save data !');
    }
  }

  async createMany(hotel: Hotel): Promise<any> {
    const hotelID = hotel._id;

    let url = URL_HOTELS_BY_LOCATION + hotel.location_id + '/reviews';
    let next = false;

    do {
      try {
        let response = await this.apiService.grabReviewByHotelLocationId(
          url,
          hotel,
        );
        const reviews = response.data;
        const paging = response.paging;

        await Promise.all(
          reviews.map(async review => {
            let date_now: Date = new Date();

            const reviewCreate = { ...review, hotelID, date_now };
            await this.create(reviewCreate);
          }),
        );

        if (paging.next != null) {
          next = true;
          url = paging.next;
        } else next = false;
      } catch (error) {
        console.log('Failed to save review from hotel : ' + hotel.name);
        console.log(error + '\n');
        break;
      }
    } while (next);
  }
}
