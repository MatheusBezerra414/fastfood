import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatus } from '../../domain/core/types/orders.types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @IsUUID('4')
  id: string;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.READY })
  @IsEnum(OrderStatus, { message: 'Status inválido' })
  status: OrderStatus;
}
