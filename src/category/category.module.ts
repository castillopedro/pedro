import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Category } from "./entities/category.entity"
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service"


@Module({
  controllers: [CategoryController],
  providers:[CategoryService],
  imports:[ TypeOrmModule.forFeature([Category])]
})
export class CategoryModule {
  /*...*/ 
}