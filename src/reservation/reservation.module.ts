import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entities/reservation.entity';
import { Seat } from '../seat/entities/seat.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Seat])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
