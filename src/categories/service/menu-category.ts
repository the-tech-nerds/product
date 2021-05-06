import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { FileStorage } from '../../common/file/entities/storage.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class MenuCategoryService {
  async execute(shopTypeId: string | null = null): Promise<any> {
    let queryBuilder = await getConnection()
      .createQueryBuilder()
      .select('category')
      .from(Category, 'category')
      .leftJoinAndMapMany(
        'category.files',
        FileStorage,
        'file',
        'category.id = file.type_id and file.type ="category"',
      )
      .where('category.is_active =1');

    if (shopTypeId) {
      queryBuilder = queryBuilder.andWhere('category.type_id = :typeId', {
        typeId: shopTypeId,
      });
    }

    const data = await queryBuilder.getMany();

    const mapData = data.map((category: any, index: any) => ({
      id: category.id,
      name: category.name,
      parent_id: category.parent_id,
      slug: category.slug,
      images: category.files.map((x: FileStorage) => x.url),
      is_active: category.is_active,
      icon: !category.parent_id ? 'snowflake-o' : null,
    }));

    return this.list_to_tree(mapData);
  }

  private list_to_tree(list: any) {
    const map: any = {};
    let node;
    const roots: any[] = [];
    let i;

    for (i = 0; i < list.length; i += 1) {
      if (list[i] !== 'undefined') {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
      }
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node) {
        if (node.parent_id !== 0) {
          if (list[map[node.parent_id]]) {
            list[map[node.parent_id]].children.push(node);
          }
        } else {
          roots.push(node);
        }
      }
    }
    return roots;
  }
}
