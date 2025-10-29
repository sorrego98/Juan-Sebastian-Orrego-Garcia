import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { Productos } from './interfaces/productos.interface';
import { SuccessType } from 'src/common/decorators/success-type.decorator';
import { SuccessTypes } from 'src/common/enums/succes-types.enum';
import { ErrorTypes } from 'src/common/enums/error-types.enum';
import { CreateProductosDto } from './dto/create-product-dto';
import { DeleteIdProductDto, UpdateIdProductDto } from './dto/id-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }

    @Get('')
    @SuccessType(SuccessTypes.GOOD_REQUEST)
    @ApiOperation({ summary: 'Obtener la información de los productos'})
    @ApiResponse({
        status: 200,
        description: 'Productos obtenidos.',
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            statusCode: {
              type: 'number',
              example: 200,
            },
            successType: {
              type: 'string',
              example: SuccessTypes.GOOD_REQUEST,
            },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: 'b736c6f5-88b3-4633-9ce4-c58e2ad2d482' },
                  nombre: { type: 'string', example: 'Producto 1' },
                  precio: { type: 'number', example: 210.15 },
                  stock: { type: 'number', example: 20 },
                },
              },
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-10-10:00:00.000Z',
            },
          },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Productos no obtenidos.',
        schema: {
            type: 'object',
            properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                statusCode: {
                  type: 'number',
                  example: 400,
                },
                errorType: {
                  type: 'string',
                  example: ErrorTypes.BAD_REQUEST,
                },
                message: {
                  type: 'string',
                  example: 'Productos no obtenidos.',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-10-10:00:00.000Z',
                },
                path: {
                  type: 'string',
                  example: '/productos',
                },
            },
        },
    })
    async getProducts(): Promise<Productos[]>{
        return this.productosService.getProducts();
    }

    @Post('')
    @SuccessType(SuccessTypes.RESOURCE_CREATED)
    @ApiOperation({ summary: 'Crear producto.'})
    @ApiResponse({
        status: 201,
        description: 'Crear producto.',
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            statusCode: {
              type: 'number',
              example: 201,
            },
            successType: {
              type: 'string',
              example: SuccessTypes.RESOURCE_CREATED,
            },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: 'b736c6f5-88b3-4633-9ce4-c58e2ad2d482' },
                  nombre: { type: 'string', example: 'Producto 2' },
                  precio: { type: 'number', example: 21.15 },
                  stock: { type: 'number', example: 2 },
                },
              },
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-10-10:00:00.000Z',
            },
          },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Producto no creado.',
        schema: {
            type: 'object',
            properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                statusCode: {
                  type: 'number',
                  example: 400,
                },
                errorType: {
                  type: 'string',
                  example: ErrorTypes.BAD_REQUEST,
                },
                message: {
                  type: 'string',
                  example: 'Producto no creado.',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-10-10:00:00.000Z',
                },
                path: {
                  type: 'string',
                  example: '/productos',
                },
            },
        },
    })
    @ApiResponse({
        status: 409,
        description: 'Producto existente.',
        schema: {
            type: 'object',
            properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                statusCode: {
                  type: 'number',
                  example: 409,
                },
                errorType: {
                  type: 'string',
                  example: ErrorTypes.RESOURCE_CONFLICT,
                },
                message: {
                  type: 'string',
                  example: 'Producto con nombre existente.',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-10-10:00:00.000Z',
                },
                path: {
                  type: 'string',
                  example: '/productos',
                },
            },
        },
    })
    async createProduct(
        @Body() createProductosDto: CreateProductosDto
    ): Promise<Productos>{
        return this.productosService.createProduct(createProductosDto);
    }

    @Put(':id')
    @SuccessType(SuccessTypes.RESOURCE_UPDATED)
    @ApiOperation({ summary: 'Actualizar producto' })
    @ApiParam({
        name: 'id',
        description: 'Identificador del producto a actualizar',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'Actualizar producto.',
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            statusCode: {
              type: 'number',
              example: 200,
            },
            successType: {
              type: 'string',
              example: SuccessTypes.RESOURCE_UPDATED,
            },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: 'b736c6f5-88b3-4633-9ce4-c58e2ad2d482' },
                  nombre: { type: 'string', example: 'Producto 2' },
                  precio: { type: 'number', example: 210.15 },
                  stock: { type: 'number', example: 20 },
                },
              },
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-10-10:00:00.000Z',
            },
          },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Producto no actualizado.',
        schema: {
            type: 'object',
            properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                statusCode: {
                  type: 'number',
                  example: 400,
                },
                errorType: {
                  type: 'string',
                  example: ErrorTypes.BAD_REQUEST,
                },
                message: {
                  type: 'string',
                  example: 'Producto no actualizado.',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-10-10:00:00.000Z',
                },
                path: {
                  type: 'string',
                  example: '/productos',
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado.',
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            statusCode: {
              type: 'number',
              example: 404,
            },
            errorType: {
              type: 'string',
              example: ErrorTypes.RESOURCE_NOT_FOUND,
            },
            message: {
              type: 'string',
              example: 'El producto no existe.',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-10-10:00:00.000Z',
            },
            path: {
                type: 'string',
                example: '/productos',
              },
          },
        },
    })
    @ApiResponse({
        status: 409,
        description: 'Producto existente.',
        schema: {
            type: 'object',
            properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                statusCode: {
                  type: 'number',
                  example: 409,
                },
                errorType: {
                  type: 'string',
                  example: ErrorTypes.RESOURCE_CONFLICT,
                },
                message: {
                  type: 'string',
                  example: 'Producto con nombre existente.',
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-10-10:00:00.000Z',
                },
                path: {
                  type: 'string',
                  example: '/productos',
                },
            },
        },
    })
    async updateProduct(
        @Param(new ValidationPipe({ transform: true }))
        updateIdProductDto: UpdateIdProductDto,
        @Body() updateProductDto: UpdateProductDto,
      ): Promise<Productos> {
        return this.productosService.updateProduct(
          updateIdProductDto,
          updateProductDto,
        );
      }

    @Delete(':id')
    @SuccessType(SuccessTypes.RESOURCE_DELETED)
    @ApiOperation({ summary: 'Eliminar producto.' })
    @ApiParam({
        name: 'id',
        description: 'Identificador del producto a eliminar',
        required: true,
    })
    @ApiResponse({
    status: 200,
    description: 'Producto eliminado.',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: true,
        },
        statusCode: {
          type: 'number',
          example: 200,
        },
        successType: {
          type: 'string',
          example: SuccessTypes.RESOURCE_DELETED,
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-10-10:00:00.000Z',
        },
      },
    },
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no eliminado.',
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            statusCode: {
              type: 'number',
              example: 400,
            },
            errorType: {
              type: 'string',
              example: ErrorTypes.BAD_REQUEST,
            },
            message: {
              type: 'string',
              example: 'No se ha eliminado el producto.',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2025-10-10:00:00.000Z',
            },
            path: {
                type: 'string',
                example: '/productos',
              },
          },
        },
        })
    @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false,
        },
        statusCode: {
          type: 'number',
          example: 404,
        },
        errorType: {
          type: 'string',
          example: ErrorTypes.RESOURCE_NOT_FOUND,
        },
        message: {
          type: 'string',
          example: 'El producto no existe.',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-10-10:00:00.000Z',
        },
        path: {
            type: 'string',
            example: '/productos',
          },
      },
    },
    })
    async deleteProduct(
        @Param(new ValidationPipe({ transform: true }))
        deleteIdProductoDto: DeleteIdProductDto,
    ): Promise<void> {
        return this.productosService.deleteProduct(deleteIdProductoDto);
    }
}
