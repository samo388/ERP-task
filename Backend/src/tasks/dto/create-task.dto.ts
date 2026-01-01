import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Finish backend module' })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Implement Swagger docs', required: false })
  @IsOptional()
  description?: string;
}
