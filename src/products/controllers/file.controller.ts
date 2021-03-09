import {
  Controller,
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

@Controller()
export class FileController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file: any,
    // @Body() content: any,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    console.log(file, '');
    return this.uploadService
      .upload(file, undefined, 'sdf', 'sdfsdf')
      .then((response: any) =>
        this.apiResponseService.successResponse(
          ['File Uploaded successfully'],
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
}
