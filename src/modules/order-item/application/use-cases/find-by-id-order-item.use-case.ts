/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { OrderItem } from '../../domain/core/order-item.entity';
import {
  IOrderItemRepository,
  ORDER_ITEM_REPOSITORY,
} from '../../ports/out/order-item.repository.port';

@Injectable()
export class FindByIdOrderItemUseCase {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,
  ) {}
  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    try {
      return await this.orderItemRepository.findByOrderId(orderId);
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving order items', {
        description: error.message,
      });
    }
  }
}
