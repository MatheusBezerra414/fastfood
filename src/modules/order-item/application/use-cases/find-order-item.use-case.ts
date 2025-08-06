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

@Injectable()
export class FindOrderItemUseCase {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,
  ) {}

  async execute(id: string): Promise<OrderItem> {
    try {
      if (!id) {
        throw new NotFoundException('Order item ID is required.');
      }
      return await this.orderItemRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving order item', {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        description: error.message,
      });
    }
  }
}
