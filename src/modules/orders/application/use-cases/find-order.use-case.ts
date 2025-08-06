import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { Order } from '../../domain/core/order.entity';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../ports/out/order.repository.port';
@Injectable()
export class FindOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    try {
      return await this.orderRepository.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching order', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching order');
    }
  }
}
