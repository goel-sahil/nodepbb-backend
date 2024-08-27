import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Category from 'src/common/models/Category.model';
import Forum from 'src/common/models/Fourm.model';
import Post from 'src/common/models/Post.model';
import Thread from 'src/common/models/Thread.model';
import User from 'src/common/models/User.model';
import UserGroup from 'src/common/models/UserGroup.model';
import UserTitle from 'src/common/models/UserTitle.model';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectModel(Post) private readonly postModel: typeof Post,
    @InjectModel(Thread) private readonly threadModel: typeof Thread,
  ) {}

  async getThreadById(id: number) {
    const thread = await this.threadModel.findByPk(id, {
      include: [
        {
          model: Forum,
          include: [
            {
              model: Category,
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });
    return thread;
  }

  async getPostsByThreadId(threadId: number, page: number) {
    const limit = 10; // Number of items per page

    // Get total number of users
    const totalPosts = await this.postModel.count({
      where: {
        thread_id: threadId,
      },
    });
    const totalPages = Math.ceil(totalPosts / limit);

    // Calculate offset and next page
    const offset = (page - 1) * limit;
    const nextPage = page < totalPages ? page + 1 : null; // Set nextPage to null if it's the last page

    // Fetch threads with pagination
    const posts =
      totalPosts > 0 && page <= totalPages
        ? await this.postModel.findAll({
            where: {
              thread_id: threadId,
            },
            limit,
            offset,
            order: [['id', 'ASC']],
            include: [
              {
                model: User,
                as: 'author',
                include: [
                  {
                    model: UserTitle,
                    attributes: ['id', 'title'],
                  },
                  {
                    model: UserGroup,
                    attributes: ['id', 'title', 'name_style'],
                  },
                ],
              },
              {
                model: User,
                as: 'editor',
              },
            ],
          })
        : [];

    return {
      data: posts,
      total: totalPosts,
      currentPage: page,
      totalPages: totalPages,
      nextPage: nextPage,
    };
  }
}
