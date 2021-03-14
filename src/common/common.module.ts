import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  UploadService,
  FileService,
} from '@the-tech-nerds/common-services';
import { FileStorage } from './file/entities/storage.entity';
import { FileController } from './file/file.controller';
import { FileStorageService } from './file/filte.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileStorage])],
  providers: [
    ApiResponseService,
    UploadService,
    FileService,
    FileStorageService,
  ],
  controllers: [FileController],
  exports: [FileStorageService],
})
export class CommonModule {}
