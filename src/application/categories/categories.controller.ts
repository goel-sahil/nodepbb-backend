import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    const data = await this.categoriesService.getCategories();
    return {
      message: 'Categories list has been fetched successfully!',
      data: data,
    };
  }
}
