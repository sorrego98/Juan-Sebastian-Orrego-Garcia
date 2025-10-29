import { ConflictException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from "src/prisma/prisma.service";
import { ErrorTypes } from '../enums/error-types.enum';

export const convertDecimalToNumber = (product: any) => {
    return {
        ...product,
        precio: (product.precio as Decimal).toNumber(),
    };
}

export const validateExistingProduct = async (
    prismaService: PrismaService,
    nombre: string,
    excludeId?: string,
): Promise<void> => {
    const existingProduct = await prismaService.producto.findFirst({
        where: {
            nombre,
            ...(excludeId && { NOT: { id: excludeId } }),
        },
    });
    if (existingProduct) {
        throw new ConflictException(`Producto existente con el nombre ${nombre}.`, { description: ErrorTypes.RESOURCE_CONFLICT });
    }
};