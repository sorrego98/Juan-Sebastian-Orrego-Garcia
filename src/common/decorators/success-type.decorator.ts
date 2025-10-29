import { SetMetadata } from "@nestjs/common";
import { SuccessTypes } from "../enums/succes-types.enum";

export const SuccessType = (type: SuccessTypes) => SetMetadata('successType', type);