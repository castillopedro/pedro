import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module"


import { User } from "./users/entities/user.entity";
import { Category } from "./category/entities/category.entity";
import { Product } from "./product/entities/product.entity";
import { ProductModule } from "./product/product.module";
import { CategoryModule } from "./category/category.module";




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username:"postgres",
      password: "123",
      port: 5432,
      database: "productos",
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Category, Product]),
    UsersModule,
    CategoryModule,
    ProductModule
  ]

})
export class AppModule { }