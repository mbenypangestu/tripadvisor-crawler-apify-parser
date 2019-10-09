import { ObjectID } from 'typeorm';

export class CreateReviewDto {
  readonly id: string;
  readonly lang: string;
  readonly location_id: string;
  readonly published_date: string;
  readonly rating: string;
  readonly helpful_votes: string;
  readonly url: string;
  readonly travel_date: string;
  readonly text: string;
  readonly title: string;

  readonly hotelID: ObjectID;
  readonly created_at: Date;
}
