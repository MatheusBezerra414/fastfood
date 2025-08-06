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

@Injectable()
export class FindPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(id: string): Promise<Payment> {
    try {
      return await this.paymentRepository.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching payment', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching payment');
    }
  }
}
