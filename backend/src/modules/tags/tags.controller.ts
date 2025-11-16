import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagsService.findOne(id);
    }

    @Post()
    create(@Body() data: { name: string }) {
        return this.tagsService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: { name: string }) {
        return this.tagsService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagsService.remove(id);
    }
}
