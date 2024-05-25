import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title!: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    completed?: boolean;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    dueDate!: Date;
}
