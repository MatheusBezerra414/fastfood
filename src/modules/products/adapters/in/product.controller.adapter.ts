import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { FindAllProductsUseCase } from '../../application/use-cases/find-products.use-case';
import { FindProductUseCase } from '../../application/use-cases/find-product.use-case';
import { RemoveProductUseCase } from '../../application/use-cases/remove-products.use-case';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case';

@ApiTags('products')
@Controller('products')
export class ProductControllerAdapter {
  constructor(
    private readonly removeProduct: RemoveProductUseCase,
    private readonly createProduct: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductUseCase: FindProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProduct.execute(createProductDto);
  }

  @Get()
  findAll() {
    return this.findAllProductsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findProductUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateProduct.execute(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeProduct.execute(id);
  }
}
