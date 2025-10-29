import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductosDto {
    @ApiProperty({
        description: 'nombre del producto',
        example: 'Producto 1',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 215.15,
    })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive( { message: 'El precio debe ser un número positivo' })
    precio: number;

    @ApiProperty({
        description: 'Cantidad de productos disponibles',
        example: 5,
    })
    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0,  { message: 'El stock debe ser un número positivo' })
    stock: number;
}