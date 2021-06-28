import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { FileStorage } from './entities/storage.entity';
import { FileStorageRequest } from './requests/fileStorage.request';
@Injectable()
export class FileStorageService {
  constructor(
    @InjectRepository(FileStorage)
    private fileRepository: Repository<FileStorage>,
  ) {}

  async create(entities: FileStorageRequest[] = []) {
    const promises: Promise<FileStorage>[] = [];
    entities.map(entity => {
      promises.push(this.fileRepository.save(entity));
      return entity;
    });
    await Promise.all(promises);
  }

  async update(fileStorageRequest: FileStorageRequest[]): Promise<any> {
    const result = Object.keys(fileStorageRequest).map(key => {
      const fileItem: any = {
        id: fileStorageRequest[Number(key)].id,
        type: fileStorageRequest[Number(key)].type,
        type_id: fileStorageRequest[Number(key)].type_id,
        url: fileStorageRequest[Number(key)].url,
      };
      return fileItem;
    });
    const ids = result.map(x => x.id);
    const items = await this.fileRepository.findByIds(ids);
    items.forEach((element: any) => {
      const file = result.filter(x => x.id === element.id)[0];
      element[`${file.type}_id`] = file.type_id;
    });
    await this.fileRepository.save(items);
    await this.updateUrlToEntity(items[0].type, items[0].url, items[0].type_id);
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

  async updateUrlToEntity(
    entity: string,
    url: string,
    id: number,
  ): Promise<any> {
    if (entity === 'category') {
      entity = 'categories';
    } else if (entity === 'shop') {
      entity = 'shops';
    } else if (entity === 'product') {
      entity = 'products';
    } else if (entity === 'product-variance') {
      entity = 'product_variances';
    } else if (entity === 'brand') {
      entity = 'brands';
    } else if (entity === 'offer') {
      entity = 'offers';
    }
    const connection = getManager();
    const sql = `update ${entity} set image = '${url}' where  id = ${id}`;
    await connection.query(sql);
  }
}
