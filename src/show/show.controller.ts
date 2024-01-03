import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ShowDto } from './dto/show.dto';
import { ShowService } from './show.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() showDto: ShowDto) {
    try {
      await this.showService.create(showDto);
      return { message: '공연 생성에 성공했습니다.' };
    } catch (error) {
      return { message: '공연 생성에 실패했습니다.', error };
    }
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: number, @Body() showDto: ShowDto) {
    try {
      await this.showService.update(id, showDto);
      return { message: '공연 업데이트에 성공했습니다.' };
    } catch (error) {
      return { message: '공연 업데이트에 실패했습니다.', error };
    }
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.showService.delete(id);
      return { message: '공연 삭제에 성공했습니다.' };
    } catch (error) {
      return { message: '공연 삭제에 실패했습니다.', error };
    }
  }
}
