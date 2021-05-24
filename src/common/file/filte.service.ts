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

  async update(fileStorageRequestuest: FileStorageRequest[]): Promise<any> {
    const result = Object.keys(fileStorageRequestuest).map(key => {
      const fileItem: any = {
        id: fileStorageRequestuest[Number(key)].id,
        type: fileStorageRequestuest[Number(key)].type,
        type_id: fileStorageRequestuest[Number(key)].type_id,
        url: fileStorageRequestuest[Number(key)].url,
      };
      return fileItem;
    });
    const ids = result.map(x => x.id);
    const items = await this.fileRepository.findByIds(ids);
    items.forEach(element => {
      const file = result.filter(x => x.id === element.id)[0];
      element.type_id = file.type_id || 0;
      if (file.type === 'product') {
        element.product_id = file.type_id;
      } else if (file.type === 'shop') {
        element.shop_id = file.type_id;
      } else if (file.type === 'product_variance') {
        element.product_variance_id = file.type_id;
      } else if (file.type === 'category') {
        element.category_id = file.type_id;
      } else if (file.type === 'brand') {
        element.brand_id = file.type_id;
      }
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
    } else if (entity === 'product_variance') {
      entity = 'product_variances';
    } else if (entity === 'brand') {
      entity = 'brands';
    }
    const connection = getManager();
    const sql = `update ${entity} set image = '${url}' where  id = ${id}`;
    await connection.query(sql);
  }
}
