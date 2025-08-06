/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { OrderItem } from '../../domain/core/order-item.entity';
import {
  IOrderItemRepository,
  ORDER_ITEM_REPOSITORY,
} from '../../ports/out/order-item.repository.port';
import { FindOrderItemUseCase } from './find-order-item.use-case';

@Injectable()
export class RemoveOrderItemUseCase {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,
    private readonly findOrderItem: FindOrderItemUseCase,
  ) {}

  async execute(id: string): Promise<OrderItem> {
    try {
      const orderItem = await this.findOrderItem.execute(id);
      if (!orderItem) {
        throw new NotFoundException(`Order item with ID ${id} not found.`);
      }
      return this.orderItemRepository.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Error removing order item', {
        description: error.message,
      });
    }
  }
}
