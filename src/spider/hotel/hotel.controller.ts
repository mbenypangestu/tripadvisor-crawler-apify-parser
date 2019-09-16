import { Controller, Post, Body, Get, HttpService, Res } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller('api/v1/spider/hotel')
export class HotelController {
  constructor(private readonly service: HotelService) {}

  @Post()
  async create(@Body() dto: CreateHotelDto) {
    this.service.create(dto);
  }

  @Get()
  async getHotel() {
    let process = await this.service.getHotelByLocId(12853007);
    return process;
  }
}
