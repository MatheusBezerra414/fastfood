import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './domain/core/payment.entity';
import { PaymentControllerAdapter } from './adapters/in/payment.controller.adapter';
import { TypeOrmPaymentRepository } from './adapters/out/typeorm-payment.repository';
import { PAYMENT_REPOSITORY } from './ports/out/payment.repository.port';
import { OrdersModule } from '../orders/orders.module';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { FindPaymentUseCase } from './application/use-cases/find-payment.use-case';
import { FindAllPaymentsUseCase } from './application/use-cases/find-payments.use-case';
import { RemovePaymentUseCase } from './application/use-cases/remove-payment.use-case';
import { UpdateStatusPaymentUseCase } from './application/use-cases/update-status-payment.use-case';
import { WebHookPaymentUseCase } from './application/use-cases/webhook-payment.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), OrdersModule],
  controllers: [PaymentControllerAdapter],
  providers: [
    CreatePaymentUseCase,
    FindPaymentUseCase,
    FindAllPaymentsUseCase,
    RemovePaymentUseCase,
    UpdateStatusPaymentUseCase,
    WebHookPaymentUseCase,
    {
      provide: PAYMENT_REPOSITORY,
      useClass: TypeOrmPaymentRepository,
    },
  ],
  exports: [],
})
export class PaymentsModule {}
