import { PartialType } from "@nestjs/swagger";
import { CreateProductosDto } from "./create-product-dto";

export class UpdateProductDto extends PartialType(CreateProductosDto) { }