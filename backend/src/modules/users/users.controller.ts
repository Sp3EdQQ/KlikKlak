import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
  idSchema,
} from './user.zod';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    // Zwraca listę wszystkich użytkowników
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const result = idSchema.safeParse(id);
    if (!result.success) {
      throw new BadRequestException('Invalid user id');
    }
    // Tu powinna być logika pobierania użytkownika z bazy
    // Jeśli użytkownik nie istnieje:
    // throw new NotFoundException('User not found');
    // Tymczasowo:
    return { id };
  }

  @Post()
  create(@Body() body: any) {
    const result = createUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return result.data;
  }

  @Put(':id')
  update(@Body() body: any) {
    const result = updateUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return result.data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = idSchema.safeParse(id);
    if (!result.success) {
      throw new BadRequestException('Invalid user id');
    }
    // Tu powinna być logika usuwania użytkownika z bazy
    // Jeśli użytkownik nie istnieje:
    // throw new NotFoundException('User not found');
    // Tymczasowo:
    return { id };
  }

  @Post('login')
  login(@Body() body: any) {
    const result = loginUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return result.data;
  }
}
