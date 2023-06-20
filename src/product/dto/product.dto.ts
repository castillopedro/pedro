import { IsNotEmpty, IsString } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string
   
   
    @IsNotEmpty()
    @IsString()
    readonly description: string


}