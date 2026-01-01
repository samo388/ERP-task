import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Mohamed Samir' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'mohamed@email.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPass123', minLength: 6 })
  @MinLength(6)
  password!: string;
}
