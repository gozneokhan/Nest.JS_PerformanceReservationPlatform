import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatDto } from './dto/seat.dto';

@Controller('seats')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Get(':id')
  async getSeatById(@Param('id', ParseIntPipe) id: number): Promise<SeatDto> {
    try {
      const seat = await this.seatService.getSeatById(id);

      if (!seat) {
        throw new NotFoundException('해당 좌석을 찾을 수 없습니다.');
      }

      return seat;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('좌석 조회 중에 오류가 발생했습니다.');
    }
  }

  @Post()
  async createSeat(@Body() seatDto: SeatDto): Promise<SeatDto> {
    try {
      const createdSeat = await this.seatService.createSeat(seatDto);
      return createdSeat;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('좌석 생성 중에 오류가 발생했습니다.');
    }
  }
}
