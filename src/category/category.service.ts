// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const categoria = await this.categoryRepository.findOneBy({id}) 

    if (!categoria) {
      throw new NotFoundException("No existe ninguna categoria con ese id")
    }

    return categoria;
  }

  async create(categoria: CategoryDto): Promise<Category> {
    return await this.categoryRepository.save(categoria);
  }

  async update(id: number, categoria: CategoryDto): Promise<Category> {
    const categoriaToUpdate = await this.categoryRepository.findOneBy({id});
    if (!categoria) {
      throw new NotFoundException("No existe ninguna categoria con ese id")
    }
    categoriaToUpdate.name = categoria.name;
    return await this.categoryRepository.save(categoriaToUpdate);
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.categoryRepository.findOneBy({id})
    if (!categoria) {
      throw new NotFoundException("No existe ninguna categoria con ese id")
    }

    await this.categoryRepository.delete(categoria)
  }
}