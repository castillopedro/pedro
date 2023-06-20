// product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const categoria = await this.productRepository.findOneBy({id}) 

    if (!categoria) {
      throw new NotFoundException("No existe ningún producto con ese id")
    }

    return categoria;
  }

  async create(categoria: ProductDto): Promise<Product> {
    return await this.productRepository.save(categoria);
  }

  async update(id: number, categoria: ProductDto): Promise<Product> {
    const categoriaToUpdate = await this.productRepository.findOneBy({id});
    if (!categoria) {
      throw new NotFoundException("No existe ningún producto con ese id")
    }
    categoriaToUpdate.name = categoria.name;
    return await this.productRepository.save(categoriaToUpdate);
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.productRepository.findOneBy({id})
    if (!categoria) {
      throw new NotFoundException("No existe ningún producto con ese id")
    }

    await this.productRepository.delete(categoria)
  }
}