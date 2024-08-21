import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/common/entities/Category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForumsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getForums() {
    const forums = await this.categoryRepository.find({
      relations: {
        forums: true,
      },
      order: {
        display_order: 'ASC',
        forums: {
          display_order: 'ASC',
        },
      },
    });

    return forums;
  }
}
