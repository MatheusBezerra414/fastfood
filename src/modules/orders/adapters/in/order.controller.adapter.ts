import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { UpdateOrderStatusDto } from '../../application/dto/update-order.dto';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { FindOrderUseCase } from '../../application/use-cases/find-order.use-case';
import { UpdateStatusOrderUseCase } from '../../application/use-cases/update-status-order.use-case';
import { RemoveOrderUseCase } from '../../application/use-cases/remove-order-use-case';
import { FindByCustomerIdOrderUseCase } from '../../application/use-cases/find-order-by-customer.use-case';
import { ApiTags } from '@nestjs/swagger';
import { FindAllOrderUseCase } from '../../application/use-cases/find-orders.use-case';

@Controller('orders')
@ApiTags('Orders')
export class OrderControllerAdapter {
  constructor(
    private readonly createOrder: CreateOrderUseCase,
    private readonly findAllOrders: FindAllOrderUseCase,
    private readonly findOrder: FindOrderUseCase,
    private readonly updateStatusOrder: UpdateStatusOrderUseCase,
    private readonly removeOrder: RemoveOrderUseCase,
    private readonly findByCustomerIdOrder: FindByCustomerIdOrderUseCase,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrder.execute(createOrderDto);
  }

  @Get()
  findAll() {
    return this.findAllOrders.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOrder.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.updateStatusOrder.execute(id, updateOrderStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeOrder.execute(id);
  }

  @Get('customer/:customerId')
  findByCustomerId(@Param('customerId') customerId: string) {
    return this.findByCustomerIdOrder.execute(customerId);
  }
}
