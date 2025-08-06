import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../../domain/core/product.entity';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../ports/out/product.repository.port';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}
  async execute(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException('Error updating product', {
          description: error.message,
        });
      }
      throw new InternalServerErrorException('Error updating product');
    }
  }
}
