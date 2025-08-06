/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Customer } from '../../domain/core/customer.entity';
import {
  ICustomerRepository,
  CUSTOMER_REPOSITORY,
} from '../../ports/out/customer.repository.port';
import { FindCustomerUseCase } from './find-customer.use-case';

@Injectable()
export class RemoveCustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
    private readonly findOne: FindCustomerUseCase,
  ) {}

  async execute(id: string): Promise<Customer> {
    try {
      const customer = await this.findOne.execute(id);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return this.customerRepository.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Error removing customer', {
        description: error.message,
      });
    }
  }
}
