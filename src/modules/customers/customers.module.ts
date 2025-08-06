import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './domain/core/customer.entity';
import { FindCustomerByEmailUseCase } from './application/use-cases/find-by-email-customer.use-case';
import { TypeOrmCustomerRepositoryAdapter } from './adapters/out/typeorm-customer.repository.adapter';
import { CustomerControllerAdapter } from './adapters/in/customer.controller.adapter';
import { CUSTOMER_REPOSITORY } from './ports/out/customer.repository.port';
import { CreateCustomerUseCase } from './application/use-cases/create-customers.use-case';
import { FindCustomerUseCase } from './application/use-cases/find-customer.use-case';
import { RemoveCustomerUseCase } from './application/use-cases/remove-customer.use-case';
import { UpdateCustomerUseCase } from './application/use-cases/update-customer.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerControllerAdapter],
  providers: [
    CreateCustomerUseCase,
    FindCustomerUseCase,
    FindCustomerByEmailUseCase,
    RemoveCustomerUseCase,
    UpdateCustomerUseCase,

    {
      provide: CUSTOMER_REPOSITORY,
      useClass: TypeOrmCustomerRepositoryAdapter,
    },
  ],
  exports: [
    CreateCustomerUseCase,
    FindCustomerUseCase,
    FindCustomerByEmailUseCase,
    RemoveCustomerUseCase,
    UpdateCustomerUseCase,
  ],
})
export class CustomersModule {}
