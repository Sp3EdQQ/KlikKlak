import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  BadRequestException,
} from '@nestjs/common';
import {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
} from './user.zod';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    // Zwraca listę wszystkich użytkowników
  }

  @Get(':id')
  findOne() {
    // Zwraca szczegóły użytkownika o podanym id
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
  remove() {
    // Usuwa użytkownika
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
