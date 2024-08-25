import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Shout from 'src/common/models/Shout.model';
import User from 'src/common/models/User.model';
import { CreateShoutDto } from './dto/create-shout.dto';

@Injectable()
export class ShoutsService {
  constructor(@InjectModel(Shout) private readonly shoutModel: typeof Shout) {}

  /**
   * Retrieves the most recent shouts with user details.
   * @returns A list of recent shouts with user information.
   */
  async getRecentShouts() {
    const shouts = await this.shoutModel.findAll({
      limit: 15,
      order: [['id', 'DESC']],
      include: {
        model: User,
        attributes: ['id', 'username'],
      },
    });
    return shouts;
  }

  /**
   * Retrieves paginated shouts with user details.
   * @param page - The page number to retrieve.
   * @returns A paginated list of shouts with user information.
   */
  async getShouts(page: number) {
    const limit = 10; // Number of items per page

    // Get total number of shouts
    const totalShouts = await this.shoutModel.count();
    const totalPages = Math.ceil(totalShouts / limit);

    // Validate and adjust the page number if necessary
    if (page > totalPages) {
      page = totalPages; // Ensure page number does not exceed total pages
    }

    // Calculate offset and next page
    const offset = (page - 1) * limit;
    const nextPage = page < totalPages ? page + 1 : null; // Set nextPage to null if it's the last page

    // Fetch shouts with pagination
    const shouts =
      totalShouts > 0
        ? await this.shoutModel.findAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            include: {
              model: User,
              attributes: ['id', 'username'],
            },
          })
        : [];

    return {
      data: shouts,
      total: totalShouts,
      currentPage: page,
      totalPages: totalPages,
      nextPage: nextPage,
    };
  }

  /**
   * Creates a new shout with the provided data.
   * @param body - The shout data.
   * @param user - The user creating the shout.
   * @returns The created shout.
   */
  async createShout(body: CreateShoutDto, user: User) {
    const shout = await this.shoutModel.create({
      message: body.message,
      user_id: user.id,
    });
    return shout;
  }

  /**
   * Deletes a shout by its ID if it belongs to the specified user.
   * @param id - The ID of the shout to delete.
   * @param user - The user attempting to delete the shout.
   * @returns A result indicating the success of the operation.
   */
  async deleteShout(id: number, user: User) {
    const result = await this.shoutModel.destroy({
      where: {
        id,
        user_id: user.id,
      },
    });
    return { success: result > 0 };
  }
}
