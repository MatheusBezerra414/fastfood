/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from '../../ports/out/customer.repository.port';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Customer } from '../../domain/core/customer.entity';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const { cpf, email } = createCustomerDto;
      if (!cpf && !email) {
        throw new NotFoundException(
          'At least one field (cpf or email) must be provided.',
        );
      }
      if (cpf) {
        const existingCustomer = await this.customerRepository.findByCpf(cpf);
        if (existingCustomer) {
          throw new ConflictException('Customer with this CPF already exists.');
        }
      }
      return this.customerRepository.create(createCustomerDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating customer', {
        description: error.message,
      });
    }
  }
}
