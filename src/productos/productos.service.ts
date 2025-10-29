import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Productos } from './interfaces/productos.interface';
import { handleServiceError } from 'src/common/utils/handle-service-error-utils';
import { ErrorTypes } from 'src/common/enums/error-types.enum';
import { CreateProductosDto } from './dto/create-product-dto';
import { DeleteIdProductDto, UpdateIdProductDto } from './dto/id-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { convertDecimalToNumber, validateExistingProduct } from 'src/common/utils/products-utils';

@Injectable()
export class ProductosService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }
    
    async getProducts(): Promise<Productos[]>{
        try {
            const products = await this.prismaService.producto.findMany({});

            return products.map(product => convertDecimalToNumber(product));  
        } catch (error) {
            handleServiceError(error, `Productos no obtenidos.`, ErrorTypes.BAD_REQUEST);
            throw error;
        }   
    }

    async createProduct(createProductosDto: CreateProductosDto): Promise<Productos>{
        try {
            const { nombre, precio, stock }= createProductosDto;

            await validateExistingProduct(this.prismaService, nombre);

            const createProduct = await this.prismaService.producto.create({
                data:{
                    nombre,
                    precio,
                    stock
                }
            });

            return convertDecimalToNumber(createProduct);
        } catch (error) {
            handleServiceError(error, `Producto no creado.`, ErrorTypes.BAD_REQUEST);
            throw error;
        }   
    }

    async updateProduct(
        updateIdProductDto: UpdateIdProductDto,
        UpdateProductDto: UpdateProductDto,
    ): Promise<Productos> {
        try {            
            const { nombre, precio, stock } = UpdateProductDto;

            if (nombre){
                await validateExistingProduct(this.prismaService, nombre, updateIdProductDto.id);
            }
            
            const updateProduct = await this.prismaService.producto.update({
                where: { id: updateIdProductDto.id },
                data: {
                    nombre,
                    precio,
                    stock
                }
            });

            return convertDecimalToNumber(updateProduct);
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`El producto no existe.`, {
                    description: ErrorTypes.RESOURCE_NOT_FOUND
                });
            }
            handleServiceError(error, `Producto no actualizado.`, ErrorTypes.BAD_REQUEST);
            throw error;
        }
    }


    async deleteProduct(deleteIdProducDto: DeleteIdProductDto): Promise<void> {
        try {
            await this.prismaService.producto.delete({
                where: { id: deleteIdProducDto.id }
            });

            return;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`El producto no existe.`, {
                    description: ErrorTypes.RESOURCE_NOT_FOUND
                });
            }
            handleServiceError(error, `No se ha eliminado el producto.`, ErrorTypes.BAD_REQUEST);
        }
    }
}
