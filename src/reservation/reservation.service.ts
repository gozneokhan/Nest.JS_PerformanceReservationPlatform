import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { UserReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  // 사용자의 정보와 예약에 필요한 정보를 기반으로 예약 엔터티를 생성하고 저장하는 메서드
  async createReservation(user: User, reservationDto: UserReservationDto) {
    try {
      // 예약 엔터티 생성
      const reservation = this.reservationRepository.create({
        user: user, // 사용자 객체를 사용하여 연결
        show: reservationDto.showId ? { id: reservationDto.showId } : null, // showId가 제공된 경우에만 연결, 아닌 경우 null
        reservationPrice: reservationDto.reservationPrice,
        reservationQuantity: reservationDto.reservationQuantity,
        isReservationPossible:
          reservationDto.isReservationPossible !== undefined
            ? reservationDto.isReservationPossible
            : true, // isReservationPossible이 제공되지 않은 경우 기본값 true
      });

      // 예약 저장
      await this.reservationRepository.save(reservation);

      return reservation;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('예약하는 동안 오류가 발생했습니다.');
    }
  }

  // 사용자의 ID를 기반으로 해당 사용자의 예약을 찾아 반환하는 메서드
  async getReservationsByUser(user: User): Promise<Reservation[]> {
    try {
      // 사용자의 ID를 기반으로 예약 검색
      const reservations = await this.reservationRepository.find({
        where: { user: { id: user.id } },
      });

      if (!reservations || reservations.length === 0) {
        // 예약이 없는 경우 예외 처리
        throw new NotFoundException('사용자의 예약이 없습니다.');
      }

      return reservations;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        '예약을 검색하는 동안 오류가 발생했습니다.',
      );
    }
  }
}
