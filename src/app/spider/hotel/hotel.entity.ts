import {
  ObjectIdColumn,
  Column,
  Entity,
  ObjectID,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IHotel } from './interfaces/hotel.interface';
import { Location } from '../location/location.entity';
import { Review } from '../review/review.entity';

@Entity({ name: 'hotel' })
export class Hotel implements IHotel {
  @ObjectIdColumn() _id: ObjectID;

  @Column() name: string;

  @Column() location_id: string;

  @Column() num_reviews: string;

  @Column() timezone: string;

  @Column() location_string: string;

  @Column() api_detail_url: string;

  @Column() doubleclick_zone: string;

  @Column() preferred_map_engine: string;

  @Column() raw_ranking: string;

  @Column() ranking_geo: string;

  @Column() ranking_geo_id: string;

  @Column() ranking_position: string;

  @Column() ranking_denominator: string;

  @Column() ranking_category: string;

  @Column() ranking: string;

  @Column() subcategory_type;

  @Column() subcategory_type_label: string;

  @Column() distance_string: string;

  @Column() rating: string;

  @Column() is_closed: boolean;

  @Column() is_long_closed: boolean;

  @Column() price_level: string;

  @Column() hotel_class: string;

  @Column() description: string;

  @Column() web_url: string;

  @Column() write_review: string;

  @Column() parent_display_name: string;

  @Column() is_jfy_enabled: boolean;

  @Column() phone: string;

  @Column() address: string;

  @Column() is_candidate_for_contact_info_suppression: boolean;

  @ObjectIdColumn() locationID: ObjectID;

  @Column({ type: 'datetime' }) created_at: Date;

  @ManyToOne(type => Location, loc => loc.hotels)
  location: Location;

  @OneToMany(type => Review, review => review.hotel)
  reviews: Review[];
}
