/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { Customer } from '../../domain/core/customer.entity';
import {
  ICustomerRepository,
  CUSTOMER_REPOSITORY,
} from '../../ports/out/customer.repository.port';

@Injectable()
export class FindCustomerByEmailUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(email: string): Promise<Customer> {
    try {
      return await this.customerRepository.findByEmail(email);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving customer by email',
        {
          description: error.message,
        },
      );
    }
  }
}
