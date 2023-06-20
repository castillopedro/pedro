// category.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../category/entities/category.entity';
import { Private, Public } from 'src/users/current.meta';
import { Role } from 'src/users/entities/role.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Public()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Post()
  @Private(Role.ADMIN)
  async create(@Body() post: CategoryDto): Promise<Category> {
    return await this.categoryService.create(post);
  }

  @Put(':id')
  @Private(Role.ADMIN)
  async update(@Param('id', ParseIntPipe) id: number, @Body() post: CategoryDto): Promise<Category> {
    return await this.categoryService.update(id, post);
  }

  @Delete(':id')
  @Private(Role.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.categoryService.delete(id);
  }
}