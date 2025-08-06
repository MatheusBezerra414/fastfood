import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsOptional()
  @Matches(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos numéricos' })
  @ApiProperty({ required: false })
  cpf?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string;
}
