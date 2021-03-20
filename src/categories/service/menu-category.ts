import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class MenuCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(): Promise<any> {
    const data = await this.categoryRepository.find({
      deleted_at: IsNull(),
      is_active: true,
    });
    const mapData = data.map((category: any, index: any) => ({
      id: category.id,
      name: category.name,
      parent_id: category.parent_id,
      slug: category.slug,
      is_active: category.is_active,
      icon: !category.parent_id ? 'snowflake-o' : null,
    }));

    const menus = this.list_to_tree(mapData);
    return menus;
  }

  private list_to_tree(list: any) {
    const map: any = {};
    let node;
    const roots: any[] = [];
    let i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parent_id !== 0) {
        list[map[node.parent_id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
}
