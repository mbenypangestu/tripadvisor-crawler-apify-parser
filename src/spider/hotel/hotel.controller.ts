import { Controller, Post, Body } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller('hotel')
export class HotelController {
    constructor(private readonly service : HotelService){}

    @Post() 
    async create(@Body() dto : CreateHotelDto) {
        this.service.create(dto);
    }
}
