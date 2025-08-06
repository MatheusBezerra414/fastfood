import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { Payment } from '../../domain/core/payment.entity';
import {
  IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../ports/out/payment.repository.port';
import { PaymentStatus } from '../../domain/core/types/payment.types';

@Injectable()
export class UpdateStatusPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(id: string, status: PaymentStatus): Promise<Payment> {
    try {
      return await this.paymentRepository.updateStatus(id, status);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Error updating payment status',
          {
            description: error.message,
          },
        );
      }
      throw new InternalServerErrorException('Error updating payment status');
    }
  }
}
