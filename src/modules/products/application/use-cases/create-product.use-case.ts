import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../../domain/core/product.entity';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../ports/out/product.repository.port';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.create(createProductDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error creating product', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error creating product');
    }
  }
}
