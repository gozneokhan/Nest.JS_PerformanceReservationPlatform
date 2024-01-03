import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDate,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class ShowDto {
  @IsNumber()
  @IsNotEmpty({ message: '포스터 이미지 URL을 입력해주세요.' })
  @IsUrl({}, { message: '올바른 URL 형식이 아닙니다.' })
  showPoster: number;

  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요' })
  showTitle: string;

  @IsString()
  @IsNotEmpty({ message: '출연진 정보를 입력해주세요.' })
  showCast: string;

  @IsString()
  @IsNotEmpty({ message: '장르를 입력해주세요.' })
  showGenre: string;

  @IsString()
  @IsNotEmpty({ message: '설명을 입력해주세요.' })
  showDescription: string;

  @IsString()
  @IsNotEmpty({ message: '날짜 및 시간을 입력해주세요.' })
  showDateTime: string;

  @IsString()
  @IsNotEmpty({ message: '장소를 입력해주세요.' })
  showVenue: string;

  @IsDate()
  @IsNotEmpty({ message: '런타임을 입력해주세요.' })
  showRunTime: Date;

  @IsInt()
  @IsNotEmpty({ message: '연령 등급을 입력해주세요.' })
  showAgeRating: number;

  @IsInt()
  @IsNotEmpty({ message: '티켓 가격을 입력해주세요.' })
  tiketPrice: number;

  @IsInt()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seat: number;
}
