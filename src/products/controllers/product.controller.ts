import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseService } from '@the-tech-nerds/common-services';
import { ListProductsService } from '../services/list-products.service';
import { Product } from '../entities/product.entity';

@Controller()
export class ProductController {
  constructor(
    private readonly listProductsService: ListProductsService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Get('/')
  async getProducts(@Res() res: Response): Promise<Response<ResponseModel>> {
    try {
      const data = await this.listProductsService.execute();
      return this.apiResponseService.successResponse(
        ['Product list fetched successfully'],
        data as Product[],
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError([e.toString()], res);
    }
  }
}
