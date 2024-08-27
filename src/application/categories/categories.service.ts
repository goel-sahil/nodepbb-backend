import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Category from 'src/common/models/Category.model';
import Forum from 'src/common/models/Fourm.model';
import User from 'src/common/models/User.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}
  async getCategories() {
    const categories = await this.categoryModel.findAll({
      order: [['display_order', 'asc']],
      include: [
        {
          model: Forum,
          separate: true,
          include: [
            {
              model: User,
            },
          ],
          order: [['display_order', 'asc']],
        },
      ],
    });
    return categories;
  }
}
