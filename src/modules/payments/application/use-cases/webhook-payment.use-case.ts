import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { WebhookPaymentDto } from '../dto/webhook-payment.dto';
import {
  IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../ports/out/payment.repository.port';
import { PaymentStatus } from '../../domain/core/types/payment.types';
import { OrderStatus } from '../../../orders/domain/core/types/orders.types';
import { FindOrderUseCase } from 'src/modules/orders/application/use-cases/find-order.use-case';
import { UpdateStatusOrderUseCase } from 'src/modules/orders/application/use-cases/update-status-order.use-case';
import { UpdateStatusPaymentUseCase } from './update-status-payment.use-case';

@Injectable()
export class WebHookPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    private readonly findOrder: FindOrderUseCase,
    private readonly updateStatusOrder: UpdateStatusOrderUseCase,
    private readonly updateStatusPayment: UpdateStatusPaymentUseCase,
  ) {}
  async execute(dto: WebhookPaymentDto) {
    try {
      const { id, status } = dto;
      const payment = await this.paymentRepository.findOne(id);
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found.`);
      }
      if (status === PaymentStatus.APPROVED) {
        const order = await this.findOrder.execute(payment.orderId);
        await this.updateStatusOrder.execute(order.id, {
          id: order.id,
          status: OrderStatus.IN_PREPARATION,
        });
      }
      if (status === PaymentStatus.FAILED) {
        await this.updateStatusOrder.execute(payment.orderId, {
          id: payment.orderId,
          status: OrderStatus.CANCELLED,
        });
      }
      const orderUpdated = await this.findOrder.execute(payment.orderId);
      const paymentUpdated = await this.updateStatusPayment.execute(id, status);
      return {
        payment: paymentUpdated,
        order: { id: orderUpdated.id, status: orderUpdated.status },
        message: `Payment status updated to ${status}`,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error processing webhook', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error processing webhook');
    }
  }
}
