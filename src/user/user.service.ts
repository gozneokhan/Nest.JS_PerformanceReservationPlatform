import { compare, hash } from 'bcrypt';

import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async register(email: string, password: string) {
    try {
      // 이메일 형식 정규식
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        throw new BadRequestException('이메일 입력이 필요합니다.');
      }

      // 이메일 형식 검증
      if (!emailRegex.test(email)) {
        throw new BadRequestException('올바르지 않은 이메일 형식입니다.');
      }

      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        throw new ConflictException('이미 등록된 이메일입니다.');
      }

      if (!password) {
        throw new BadRequestException('비밀번호 입력이 필요합니다.');
      }

      if (password.length < 6) {
        throw new BadRequestException('비밀번호는 최소 6자 이상이어야 합니다.');
      }

      // 비밀번호 해싱 및 사용자 저장
      const hashedPassword = await hash(password, 10);
      await this.userRepository.save({
        email,
        password: hashedPassword,
      });

      return '회원가입이 완료되었습니다!!!!';
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 로그인
  async login(email: string, password: string) {
    try {
      if (!email) {
        throw new BadRequestException('이메일 입력이 필요합니다.');
      }

      const user = await this.userRepository.findOne({
        select: ['id', 'email', 'password'],
        where: { email },
      });

      if (_.isNil(user)) {
        throw new UnauthorizedException(
          '이메일 또는 비밀번호가 일치하는 인증 정보가 없습니다.',
        );
      }

      if (!password) {
        throw new BadRequestException('비밀번호 입력이 필요합니다.');
      }

      if (!(await compare(password, user.password))) {
        throw new UnauthorizedException(
          '이메일 또는 비밀번호가 일치하는 정보가 없습니다.',
        );
      }

      // JWT 토큰 발급
      const payload = { email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // 이메일로 사용자 조회
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
