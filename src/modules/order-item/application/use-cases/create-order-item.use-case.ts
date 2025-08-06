/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';
import { OrderItem } from '../../domain/core/order-item.entity';
import {
  IOrderItemRepository,
  ORDER_ITEM_REPOSITORY,
} from '../../ports/out/order-item.repository.port';
import { FindProductUseCase } from 'src/modules/products/application/use-cases/find-product.use-case';

@Injectable()
export class CreateOrderItemUseCase {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,
    private readonly findProduct: FindProductUseCase,
  ) {}

  async execute(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    try {
      const product = await this.findProduct.execute(
        createOrderItemDto.productId,
      );
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      const order = await this.orderItemRepository.create({
        ...createOrderItemDto,
        product,
      });
      return await this.orderItemRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Error creating order item', {
        description: error.message,
      });
    }
  }
}
