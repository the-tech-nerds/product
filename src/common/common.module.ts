import { FileStorage } from './file/entities/storage.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApiResponseService,
  UploadService,
  FileService,
} from '@the-tech-nerds/common-services';
import { FileController } from './file/file.controller';
import { FileStorageService } from './file/filte.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileStorage])],
  providers: [ApiResponseService, UploadService, FileService, FileStorageService],
  controllers: [FileController],
})
export class CommonModule {}
