import { BadRequestException, HttpException } from "@nestjs/common";
import { ErrorTypes } from "../enums/error-types.enum";

export const handleServiceError = (error: any, defaultMessage: string, errorType?: ErrorTypes): never => {
    if (error instanceof HttpException) {
        throw error;
    }

    throw new BadRequestException(defaultMessage, { description: errorType || ErrorTypes.INTERNAL_SERVER_ERROR });
}