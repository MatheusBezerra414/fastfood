import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from '../../application/dto/create-payment.dto';
import { WebhookPaymentDto } from '../../application/dto/webhook-payment.dto';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { FindAllPaymentsUseCase } from '../../application/use-cases/find-payments.use-case';
import { FindPaymentUseCase } from '../../application/use-cases/find-payment.use-case';
import { RemovePaymentUseCase } from '../../application/use-cases/remove-payment.use-case';
import { WebHookPaymentUseCase } from '../../application/use-cases/webhook-payment.use-case';

@ApiTags('payments')
@Controller('payments')
export class PaymentControllerAdapter {
  constructor(
    private readonly createPayment: CreatePaymentUseCase,
    private readonly findAllPayments: FindAllPaymentsUseCase,
    private readonly findPayment: FindPaymentUseCase,
    private readonly removePayment: RemovePaymentUseCase,
    private readonly webhookPayment: WebHookPaymentUseCase,
  ) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.createPayment.execute(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.findAllPayments.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findPayment.execute(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removePayment.execute(id);
  }

  @Post('webhook')
  webhook(@Body() webhookPaymentDto: WebhookPaymentDto) {
    return this.webhookPayment.execute(webhookPaymentDto);
  }
}
