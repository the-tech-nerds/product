import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiResponseService,
  UploadService,
} from '@the-tech-nerds/common-services';

@Controller('file')
export class FileController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file: any,
    @Body() content: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const model = JSON.parse(content.fileStoreInfo);
    console.log(file, content);
    return this.uploadService
      .upload(file, undefined, model.folder, model.entity)
      .then((response: any) =>
        this.apiResponseService.successResponse(
          ['Image Uploaded successfully'],
          response,
          res,
        ),
      )
      .catch((error: any) =>
        this.apiResponseService.internalServerError(
          ['Something went wrong! please try again later'],
          res,
        ),
      );
  }

  @Delete('/:id')
  async DeleteShop(
    @Param('id') id: number,
    @Body() item: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.uploadService.deleteFromS3(
      'khan-fresh-corner',
      item.folder,
      id,
      item.url,
    );
    return this.apiResponseService.successResponse(
      ['Shop has been deleted successfully'],
      data,
      res,
    );
  }
}
