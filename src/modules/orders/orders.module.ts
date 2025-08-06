import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/core/order.entity';
import { TypeOrmOrderRepositoryAdapter } from './adapters/out/typeorm-order.repository.adapter';
import { OrderControllerAdapter } from './adapters/in/order.controller.adapter';
import { ORDER_REPOSITORY } from './ports/out/order.repository.port';
import { CustomersModule } from '../customers/customers.module';
import { ProductsModule } from '../products/products.module';
import { OrderItemModule } from '../order-item/order-item.module';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { FindOrderUseCase } from './application/use-cases/find-order.use-case';
import { FindByCustomerIdOrderUseCase } from './application/use-cases/find-order-by-customer.use-case';
import { RemoveOrderUseCase } from './application/use-cases/remove-order-use-case';
import { UpdateStatusOrderUseCase } from './application/use-cases/update-status-order.use-case';
import { FindAllOrderUseCase } from './application/use-cases/find-orders.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    CustomersModule,
    ProductsModule,
    OrderItemModule,
  ],
  controllers: [OrderControllerAdapter],
  providers: [
    CreateOrderUseCase,
    FindAllOrderUseCase,
    FindOrderUseCase,
    FindByCustomerIdOrderUseCase,
    RemoveOrderUseCase,
    UpdateStatusOrderUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: TypeOrmOrderRepositoryAdapter,
    },
  ],
  exports: [
    CreateOrderUseCase,
    FindAllOrderUseCase,
    FindOrderUseCase,
    UpdateStatusOrderUseCase,
  ],
})
export class OrdersModule {}
