import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import Post from 'src/common/models/Post.model';
import Session from 'src/common/models/Session.model';
import Thread from 'src/common/models/Thread.model';
import User from 'src/common/models/User.model';
import UserGroup from 'src/common/models/UserGroup.model';
import UserTitle from 'src/common/models/UserTitle.model';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Thread) private readonly threadModel: typeof Thread,
    @InjectModel(Post) private readonly postModel: typeof Post,
    @InjectModel(Session) private readonly sessionModel: typeof Session,
  ) {}

  /**
   * Retrieves statistics for active members, users, and posts.
   * @returns An object containing various statistics.
   */
  async getStats() {
    // Define the time range for recent activity
    const recentTime = new Date();
    recentTime.setMinutes(recentTime.getMinutes() - 15);

    // Fetch all sessions from the last 15 minutes
    const totalActiveMembers = await this.sessionModel.findAll({
      where: {
        last_active: {
          [Op.gte]: recentTime,
        },
      },
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
    });

    // Filter sessions to separate active users from guests
    const totalActiveUsers = totalActiveMembers.filter(
      (session) => session.user_id != null,
    );
    const totalActiveGuests =
      totalActiveMembers.length - totalActiveUsers.length;
    const activeUsers = totalActiveUsers.map((session) => session.user);

    // Fetch total number of registered users
    const totalUsers = await this.userModel.count();

    // Fetch the most recently registered user
    const newestMember = await this.userModel.findOne({
      order: [['created_at', 'DESC']], // Ensure this is the correct column
    });

    // Return the statistics
    return {
      totalActiveMembers: {
        total: totalActiveMembers.length,
        users: totalActiveUsers.length,
        guests: totalActiveGuests,
      },
      activeUsers,
      totalPosts: await this.postModel.count(),
      totalThreads: await this.threadModel.count(),
      totalUsers,
      newestUser: newestMember,
    };
  }

  /**
   * Retrieves paginated members with details.
   * @param page - The page number to retrieve.
   * @returns A paginated list of users information.
   */
  async getMembers(page: number) {
    const limit = 10; // Number of items per page

    // Get total number of users
    const totalUsers = await this.userModel.count();
    const totalPages = Math.ceil(totalUsers / limit);

    // Validate and adjust the page number if necessary
    if (page > totalPages) {
      page = totalPages; // Ensure page number does not exceed total pages
    }

    // Calculate offset and next page
    const offset = (page - 1) * limit;
    const nextPage = page < totalPages ? page + 1 : null; // Set nextPage to null if it's the last page

    // Fetch users with pagination
    const users =
      totalUsers > 0
        ? await this.userModel.findAll({
            limit,
            offset,
            order: [['id', 'ASC']],
            attributes: [
              'id',
              'username',
              'email',
              'user_group_id',
              'user_title_id',
            ],
            include: [
              {
                model: UserGroup,
                attributes: ['id', 'title', 'name_style'],
              },
              {
                model: UserTitle,
                attributes: ['id', 'title'],
              },
            ],
          })
        : [];

    return {
      data: users,
      total: totalUsers,
      currentPage: page,
      totalPages: totalPages,
      nextPage: nextPage,
    };
  }
}
