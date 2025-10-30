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
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = idSchema.safeParse(id);
    if (!result.success) {
      throw new BadRequestException('Invalid user id');
    }
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    const result = createUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return this.usersService.create(result.data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const idResult = idSchema.safeParse(id);
    if (!idResult.success) {
      throw new BadRequestException('Invalid user id');
    }
    const result = updateUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return this.usersService.update(id, result.data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = idSchema.safeParse(id);
    if (!result.success) {
      throw new BadRequestException('Invalid user id');
    }
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(@Body() body: any) {
    const result = loginUserSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }
    return this.usersService.login(result.data.email, result.data.password);
  }

  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    if (!body.refresh_token) {
      throw new BadRequestException('Refresh token is required');
    }
    return this.usersService.refreshAccessToken(body.refresh_token);
  }

  @Post('logout/:id')
  async logout(@Param('id') id: string) {
    const result = idSchema.safeParse(id);
    if (!result.success) {
      throw new BadRequestException('Invalid user id');
    }
    return this.usersService.logout(id);
  }
}
