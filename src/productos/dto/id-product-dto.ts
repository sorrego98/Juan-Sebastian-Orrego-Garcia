import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export abstract class IdProductDto {
    @ApiProperty({
        description: 'id',
        example: 'b736c6f5-88b3-4633-9ce4-c58e2ad2d482',
    })
    @IsNotEmpty()
    @IsUUID()
    id: string;
}

export class DeleteIdProductDto extends IdProductDto {}
export class UpdateIdProductDto extends IdProductDto {}