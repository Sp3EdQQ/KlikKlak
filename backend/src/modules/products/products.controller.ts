import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  /**
   * GET /products - wszystkie produkty
   * GET /products?type=cpu - produkty po typie komponentu
   * GET /products?categoryId=xxx - produkty po kategorii
   * GET /products?page=1&limit=20 - paginacja
   */
  @Get()
  async findAll(
    @Query('type') type?: string,
    @Query('categoryId') categoryId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = parseInt(page || '1');
    const limitNum = parseInt(limit || '20');
    
    if (type) {
      return this.productsService.findByComponentType(type, pageNum, limitNum);
    }
    if (categoryId) {
      return this.productsService.findByCategory(categoryId, pageNum, limitNum);
    }
    return this.productsService.findAll(pageNum, limitNum);
  }

  /**
   * GET /products/:id - szczegóły produktu z danymi komponentu
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
