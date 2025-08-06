import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/core/product.entity';
import { ProductControllerAdapter } from './adapters/in/product.controller.adapter';
import { TypeOrmProductRepository } from './adapters/out/typeorm-product.repository';
import { PRODUCT_REPOSITORY } from './ports/out/product.repository.port';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { FindAllProductsUseCase } from './application/use-cases/find-products.use-case';
import { FindProductUseCase } from './application/use-cases/find-product.use-case';
import { RemoveProductUseCase } from './application/use-cases/remove-products.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductControllerAdapter],
  providers: [
    RemoveProductUseCase,
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindProductUseCase,
    UpdateProductUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: TypeOrmProductRepository,
    },
  ],
  exports: [
    RemoveProductUseCase,
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindProductUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductsModule {}
