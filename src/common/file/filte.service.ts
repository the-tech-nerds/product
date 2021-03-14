import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileStorage } from './entities/storage.entity';
import { FileStorageRequest } from './requests/fileStorage.request';

@Injectable()
export class FileStorageService {
  constructor(
    @InjectRepository(FileStorage)
    private fileRepository: Repository<FileStorage>,
  ) {}

  async update(fileStorageRequestuest: FileStorageRequest[]): Promise<any> {
    const result = Object.keys(fileStorageRequestuest).map(key => ({
      id: fileStorageRequestuest[Number(key)].id,
      type: fileStorageRequestuest[Number(key)].type,
      type_id: fileStorageRequestuest[Number(key)].type_id,
      url: fileStorageRequestuest[Number(key)].url,
    }));
    const ids = result.map(x => x.id);
    const items = await this.fileRepository.findByIds(ids);
    items.forEach(element => {
      const file = result.filter(x => x.id === element.id)[0];
      element.type_id = file.type_id || 0;
    });
    await this.fileRepository.save(items);
    return items;
  }

  async getListByEntityId(
    entity: string,
    entity_id: number,
  ): Promise<FileStorageRequest[]> {
    return this.fileRepository.find({
      type: entity,
      type_id: entity_id,
    });
  }
}
