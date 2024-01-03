import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from 'src/seat/entities/seat.entity';
import { SeatDto } from './dto/seat.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async getSeatById(id: number): Promise<SeatDto> {
    try {
      const seat = await this.seatRepository.findOne({ where: { id } });

      if (!seat) {
        throw new NotFoundException('해당 좌석을 찾을 수 없습니다.');
      }

      return seat;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('좌석 조회 중에 오류가 발생했습니다.');
    }
  }

  async createSeat(seatDto: SeatDto): Promise<SeatDto> {
    try {
      // 여기에서 seatDto에서 showId를 사용하거나 필요하지 않다면 무시해도 됩니다.
      const createdSeat = await this.seatRepository.save(seatDto);
      return createdSeat;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('좌석 생성 중에 오류가 발생했습니다.');
    }
  }
}
