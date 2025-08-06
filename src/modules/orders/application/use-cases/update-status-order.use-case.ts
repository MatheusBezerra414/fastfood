import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { UpdateOrderStatusDto } from '../dto/update-order.dto';
import { Order } from '../../domain/core/order.entity';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../ports/out/order.repository.port';
@Injectable()
export class UpdateStatusOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}
  async execute(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    try {
      await this.orderRepository.findOne(id);
      return this.orderRepository.update(id, {
        status: updateOrderStatusDto.status,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error updating order status', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error updating order status');
    }
  }
}
