import { Role } from 'src/user/types/userRole.type';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // JWT 토큰을 사용한 인증 수행
    const authenticated = await super.canActivate(context);

    // 인증에 실패한 경우, 요청 거부
    if (!authenticated) {
      return false;
    }

    // 메타데이터에서 필요한 역할 정보를 가져오기
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 만약 역할 정보가 없다면, 모든 요청을 허용
    if (!requiredRoles) {
      return true;
    }

    // 요청에서 사용자 정보 가져오기
    const { user } = context.switchToHttp().getRequest();

    // 사용자의 역할이 필요한 역할 중 하나와 일치하는지 확인
    return requiredRoles.some((role) => user.role === role);
  }
}
