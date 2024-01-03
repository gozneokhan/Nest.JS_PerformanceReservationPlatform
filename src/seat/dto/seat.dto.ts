import { IsInt, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class SeatDto {
  @IsInt()
  @IsNotEmpty({ message: '좌석 ID를 입력해주세요.' })
  id: number;

  @IsInt()
  @IsNotEmpty({ message: '공연 ID를 입력해주세요.' })
  showId?: number;

  @IsString()
  @IsNotEmpty({ message: '좌석 번호를 입력해주세요.' })
  seatNumber: string;

  @IsString()
  @IsNotEmpty({ message: '좌석 등급을 입력해주세요.' })
  seatClass: string;

  @IsInt()
  @IsNotEmpty({ message: '좌석 가격을 입력해주세요.' })
  seatPrice: number;

  @IsBoolean()
  @IsNotEmpty({ message: '좌석 사용 가능 여부를 입력해주세요.' })
  seatAvailable: boolean;
}
