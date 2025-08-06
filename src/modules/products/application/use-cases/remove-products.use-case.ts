import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { Product } from '../../domain/core/product.entity';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../ports/out/product.repository.port';

@Injectable()
export class RemoveProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}
  async execute(id: string): Promise<Product> {
    try {
      return await this.productRepository.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error removing product', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error removing product');
    }
  }
}
