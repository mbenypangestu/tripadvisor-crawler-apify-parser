import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location) private readonly repo: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException('Failed to get data location !');
    }
  }
}
