/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../../domain/core/customer.entity';
import {
  ICustomerRepository,
  CUSTOMER_REPOSITORY,
} from '../../ports/out/customer.repository.port';
import { FindCustomerUseCase } from './find-customer.use-case';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
    private readonly findCustomer: FindCustomerUseCase,
  ) {}

  async execute(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    try {
      const customer = await this.findCustomer.execute(id);
      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found.`);
      }
      return this.customerRepository.update(id, updateCustomerDto);
    } catch (error) {
      throw new InternalServerErrorException('Error updating customer', {
        description: error.message,
      });
    }
  }
}
