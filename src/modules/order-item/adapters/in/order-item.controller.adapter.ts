import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrderItemDto } from '../../application/dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../../application/dto/update-order-item.dto';
import { CreateOrderItemUseCase } from '../../application/use-cases/create-order-item.use-case';
import { FindAllOrderItemUseCase } from '../../application/use-cases/find-order-items.use-case';
import { FindOrderItemUseCase } from '../../application/use-cases/find-order-item.use-case';
import { UpdateOrderItemUseCase } from '../../application/use-cases/update-order-item.use-case';
import { RemoveOrderItemUseCase } from '../../application/use-cases/remove-order-item.use-case';
import { FindByIdOrderItemUseCase } from '../../application/use-cases/find-by-id-order-item.use-case';
import { ApiTags } from '@nestjs/swagger';

@Controller('order-items')
@ApiTags('Order Items')
export class OrderItemControllerAdapter {
  constructor(
    private readonly createOrderItem: CreateOrderItemUseCase,
    private readonly findByIdOrderItem: FindByIdOrderItemUseCase,
    private readonly findAllOrderItems: FindAllOrderItemUseCase,
    private readonly findOrderItem: FindOrderItemUseCase,
    private readonly updateOrderItem: UpdateOrderItemUseCase,
    private readonly removeOrderItem: RemoveOrderItemUseCase,
  ) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.createOrderItem.execute(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.findAllOrderItems.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOrderItem.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.updateOrderItem.execute(id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeOrderItem.execute(id);
  }

  @Get('order/:orderId')
  findByOrderId(@Param('orderId') orderId: string) {
    return this.findByIdOrderItem.findByOrderId(orderId);
  }
}
