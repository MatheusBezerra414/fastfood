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
export class FindAllOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(): Promise<Order[]> {
    try {
      return await this.orderRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching orders', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching orders');
    }
  }
}
