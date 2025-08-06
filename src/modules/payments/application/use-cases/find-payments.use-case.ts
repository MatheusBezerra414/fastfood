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
export class FindAllPaymentsUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error fetching payments', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error fetching payments');
    }
  }
}
