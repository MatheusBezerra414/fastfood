import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../../domain/core/payment.entity';
import {
  IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../ports/out/payment.repository.port';
import { FindOrderUseCase } from 'src/modules/orders/application/use-cases/find-order.use-case';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    private readonly findOrder: FindOrderUseCase,
  ) {}

  async execute(dto: CreatePaymentDto): Promise<Payment> {
    try {
      const { orderId } = dto;
      const order = await this.findOrder.execute(orderId);
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found.`);
      }
      const amount = order.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );
      return await this.paymentRepository.create({
        orderId: order.id,
        amount,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error creating payment', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error creating payment');
    }
  }
}
