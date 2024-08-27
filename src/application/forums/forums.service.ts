import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Category from 'src/common/models/Category.model';
import Forum from 'src/common/models/Fourm.model';
import Thread from 'src/common/models/Thread.model';
import User from 'src/common/models/User.model';

@Injectable()
export class ForumsService {
  constructor(
    @InjectModel(Forum) private readonly forumModel: typeof Forum,
    @InjectModel(Thread) private readonly threadModel: typeof Thread,
  ) {}

  async getForumByID(id: number) {
    const forum = await this.forumModel.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'title'],
        },
      ],
    });
    return forum;
  }

  async getThreadsByForumId(forumId: number, page: number) {
    const limit = 10; // Number of items per page

    // Get total number of users
    const totalThreads = await this.threadModel.count({
      where: {
        forum_id: forumId,
      },
    });
    const totalPages = Math.ceil(totalThreads / limit);

    // Validate and adjust the page number if necessary

    // Calculate offset and next page
    const offset = (page - 1) * limit;
    const nextPage = page < totalPages ? page + 1 : null; // Set nextPage to null if it's the last page

    // Fetch threads with pagination
    const threads =
      totalThreads > 0 && page <= totalPages
        ? await this.threadModel.findAll({
            where: {
              forum_id: forumId,
            },
            limit,
            offset,
            order: [
              ['sticky', 'DESC'],
              ['id', 'DESC'],
            ],
            include: [
              {
                model: User,
                as: 'author',
              },
              {
                model: User,
                as: 'last_poster',
              },
            ],
          })
        : [];

    return {
      data: threads,
      total: totalThreads,
      currentPage: page,
      totalPages: totalPages,
      nextPage: nextPage,
    };
  }
}
