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
export class FindByCustomerIdOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(customerId: string): Promise<Order[]> {
    try {
      return await this.orderRepository.findByCustomerId(customerId);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Error retrieving customer orders',
          {
            description: error.message,
          },
        );
      }
      throw new InternalServerErrorException(
        'Error retrieving customer orders',
      );
    }
  }
}
