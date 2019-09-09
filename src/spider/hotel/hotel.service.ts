import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './interfaces/hotel.interface';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelService {
    constructor(@InjectModel('Hotel') private readonly model : Model<Hotel>){}

    async create(dto : CreateHotelDto) : Promise<Hotel> {
        let process = new this.model(dto);
        return await process.save();
    }
}
