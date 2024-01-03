// reservation.controller.ts

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserReservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservation')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Roles(Role.User)
  async createReservation(
    @Body() reservationDto: UserReservationDto,
    @Req() req,
  ) {
    try {
      const userId = req.user.id;

      const reservation = await this.reservationService.createReservation(
        userId,
        reservationDto,
      );

      return {
        message: '예약이 성공적으로 완료되었습니다.',
        reservation,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
