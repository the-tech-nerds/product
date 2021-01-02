import { Controller, Get, Res } from '@nestjs/common';

import { ApiResponseService } from 'src/utils/services/api-response/response/api-response.service';
import { Response } from 'express';
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
