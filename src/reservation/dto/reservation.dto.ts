import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';

export class UserReservationDto {
  @IsInt()
  @IsNotEmpty({ message: '공연을 선택해주세요.' })
  showId: number;

  @IsDateString()
  @IsNotEmpty({ message: '예매 날짜와 시간을 선택해주세요.' })
  reservationDateTime: string;

  @IsInt()
  @IsNotEmpty({ message: '예매 수량을 입력해주세요' })
  reservationQuantity: number;
  isReservationPossible: DeepPartial<boolean>;
  reservationPrice: number;
}

// 서버에서 처리해야하는 부분
// @IsNumber()
// @IsNotEmpty({ message: '예매 가격은 필수입니다.' })
// reservationPrice: number;

// @IsBoolean()
// @IsNotEmpty({ message: '예매 가능 상태를 선택해주세요.' })
// isReservationPossible: boolean;
