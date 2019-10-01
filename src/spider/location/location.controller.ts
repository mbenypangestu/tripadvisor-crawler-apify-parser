import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Location } from './location.entity';
import { LocationService } from './location.service';
import { GetLocation } from './dto/get-location.dto';

@Controller('location')
export class LocationController {
  constructor(public service: LocationService) {}

  @Get()
  async getAll(): Promise<any> {
    const datas = (await this.service.findAll()).map(
      loc => new GetLocation(loc),
    );
    return Promise.resolve(datas);
  }
}
