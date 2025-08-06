import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './domain/core/order-item.entity';
import { TypeOrmOrderItemRepositoryAdapter } from './adapters/out/typeorm-order-item.repository.adapter';
import { OrderItemControllerAdapter } from './adapters/in/order-item.controller.adapter';
import { ORDER_ITEM_REPOSITORY } from './ports/out/order-item.repository.port';
import { ProductsModule } from '../products/products.module';
import { CreateOrderItemUseCase } from './application/use-cases/create-order-item.use-case';
import { FindByIdOrderItemUseCase } from './application/use-cases/find-by-id-order-item.use-case';
import { FindOrderItemUseCase } from './application/use-cases/find-order-item.use-case';
import { FindAllOrderItemUseCase } from './application/use-cases/find-order-items.use-case';
import { RemoveOrderItemUseCase } from './application/use-cases/remove-order-item.use-case';
import { UpdateOrderItemUseCase } from './application/use-cases/update-order-item.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), ProductsModule],
  controllers: [OrderItemControllerAdapter],
  providers: [
    CreateOrderItemUseCase,
    FindByIdOrderItemUseCase,
    FindOrderItemUseCase,
    FindAllOrderItemUseCase,
    RemoveOrderItemUseCase,
    UpdateOrderItemUseCase,
    {
      provide: ORDER_ITEM_REPOSITORY,
      useClass: TypeOrmOrderItemRepositoryAdapter,
    },
  ],
  exports: [
    CreateOrderItemUseCase,
    FindByIdOrderItemUseCase,
    FindOrderItemUseCase,
    FindAllOrderItemUseCase,
    RemoveOrderItemUseCase,
    UpdateOrderItemUseCase,
  ],
})
export class OrderItemModule {}
