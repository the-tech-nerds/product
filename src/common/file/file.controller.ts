import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
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
import { FileStorageService } from './filte.service';
import { FileStorageRequest } from './requests/fileStorage.request';

@Controller('file')
export class FileController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly apiResponseService: ApiResponseService,
    private readonly fileStorageService: FileStorageService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file: any,
    @Body() content: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const model = JSON.parse(content.fileStoreInfo);
    return this.uploadService
      .upload(file, undefined, model.folder, model.entity, model.entity_id)
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
  async DeleteFile(
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
      ['File has been deleted successfully'],
      data,
      res,
    );
  }

  @Put()
  async UpdateFiles(
    @Body() items: FileStorageRequest[],
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    const data = await this.fileStorageService.update(items);
    return this.apiResponseService.successResponse(
      ['File has been deleted successfully'],
      data,
      res,
    );
  }
}
