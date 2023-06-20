// product.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../product/entities/product.entity';
import { Private, Public } from 'src/users/current.meta';
import { Role } from 'src/users/entities/role.entity';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Public()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Post()
  @Private(Role.ADMIN)
  async create(@Body() post: ProductDto): Promise<Product> {
    return await this.productService.create(post);
  }

  @Put(':id')
  @Private(Role.ADMIN)
  async update(@Param('id', ParseIntPipe) id: number, @Body() post: ProductDto): Promise<Product> {
    return await this.productService.update(id, post);
  }

  @Delete(':id')
  @Private(Role.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productService.delete(id);
  }
}