import { Module } from '@nestjs/common';
import {
  ApiResponseService,
  UploadService,
  FileService,
} from '@the-tech-nerds/common-services';
import { FileController } from './file/file.controller';

@Module({
  imports: [],
  providers: [ApiResponseService, UploadService, FileService],
  controllers: [FileController],
})
export class CommonModule {}
