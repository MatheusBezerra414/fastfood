import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../../domain/core/order.entity';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from '../../ports/out/order.repository.port';
import { FindCustomerByEmailUseCase } from '../../../customers/application/use-cases/find-by-email-customer.use-case';
import { Customer } from '../../../customers/domain/core/customer.entity';
import { OrderItem } from '../../../order-item/domain/core/order-item.entity';
import { FindCustomerUseCase } from 'src/modules/customers/application/use-cases/find-customer.use-case';
import { CreateOrderItemUseCase } from 'src/modules/order-item/application/use-cases/create-order-item.use-case';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly findCustomer: FindCustomerUseCase,
    private readonly findCustomerByEmail: FindCustomerByEmailUseCase,
    private readonly createOrderItem: CreateOrderItemUseCase,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const { customerId, items } = createOrderDto;
      let customer: Customer | null;
      if (!customerId) {
        customer = await this.findCustomerByEmail.execute(
          'visitante@example.com',
        );
      } else {
        customer = await this.findCustomer.execute(customerId);
      }
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        const orderItem = await this.createOrderItem.execute({
          productId: item.productId,
          quantity: item.quantity,
        });

        orderItems.push(orderItem);
      }

      return this.orderRepository.create({
        customer,
        items: orderItems,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error creating order', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error creating order');
    }
  }
}
