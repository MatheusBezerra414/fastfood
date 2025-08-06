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

@Injectable()
export class FindCustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}
  async execute(id: string): Promise<Customer> {
    try {
      if (!id) {
        throw new NotFoundException('Customer ID is required.');
      }
      const customer = await this.customerRepository.findOne(id);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return customer;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving customer', {
        description: error.message,
      });
    }
  }
}
