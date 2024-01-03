import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { Show } from './entities/show.entity';
import { ShowDto } from '../show/dto/show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find();
  }

  async findOne(id: number): Promise<Show> {
    return await this.verifyShowById(id);
  }

  async create(showDto: ShowDto): Promise<Show> {
    const createdShow = await this.showRepository.save(showDto);
    return createdShow;
  }

  async update(id: number, updateShowDto: ShowDto): Promise<Show> {
    await this.verifyShowById(id);
    await this.showRepository.update({ id }, updateShowDto);
    return await this.verifyShowById(id);
  }

  async delete(id: number): Promise<Show> {
    const deletedShow = await this.verifyShowById(id);
    await this.showRepository.delete({ id });
    return deletedShow;
  }

  private async verifyShowById(id: number): Promise<Show> {
    const show = await this.showRepository.findOne({ where: { id } });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return show;
  }
}
