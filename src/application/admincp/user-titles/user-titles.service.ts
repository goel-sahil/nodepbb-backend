import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserTitleDto } from './dto/create-user-title.dto';
import { UpdateUserTitleDto } from './dto/update-user-title.dto';
import { InjectModel } from '@nestjs/sequelize';
import UserTitle from 'src/common/models/UserTitle.model';

@Injectable()
export class UserTitlesService {
  constructor(
    @InjectModel(UserTitle)
    private readonly userTitleModel: Repository<UserTitle>,
  ) {}

  /**
   * Creates a new user title.
   * @param body - DTO containing data for the new user title.
   * @returns The newly created user title.
   */
  async create(body: CreateUserTitleDto): Promise<UserTitle> {
    const newUserTitle = this.userTitleModel.create(body);
    return this.userTitleModel.save(newUserTitle);
  }

  /**
   * Retrieves all user titles.
   * @returns An array of user titles.
   */
  async findAll(): Promise<UserTitle[]> {
    return this.userTitleModel.find();
  }

  /**
   * Retrieves a single user title by its ID.
   * @param id - The ID of the user title to retrieve.
   * @returns The user title with the specified ID.
   * @throws NotFoundException if the user title is not found.
   */
  async findOne(id: number): Promise<UserTitle> {
    const userTitle = await this.userTitleModel.findOne({ where: { id } });
    this.throwIfNotFound(!userTitle, id);
    return userTitle;
  }

  /**
   * Updates a user title by its ID.
   * @param id - The ID of the user title to update.
   * @param body - DTO containing the updated data for the user title.
   * @returns The updated user title.
   * @throws NotFoundException if the user title is not found.
   */
  async update(id: number, body: UpdateUserTitleDto): Promise<UserTitle> {
    const userTitle = await this.userTitleModel.preload({
      id,
      ...body,
    });
    this.throwIfNotFound(!userTitle, id);
    return this.userTitleModel.save(userTitle);
  }

  /**
   * Deletes a user title by its ID.
   * @param id - The ID of the user title to delete.
   * @returns A promise that resolves when the user title is deleted.
   * @throws NotFoundException if the user title is not found.
   */
  async remove(id: number): Promise<void> {
    const result = await this.userTitleModel.delete(id);
    this.throwIfNotFound(result.affected === 0, id);
  }

  /**
   * Helper method to throw NotFoundException based on a condition.
   * @param condition - The condition to check.
   * @param id - The ID of the entity.
   * @throws NotFoundException if the condition is true.
   */
  private throwIfNotFound(condition: boolean, id: number): void {
    if (condition) {
      throw new NotFoundException(`User title with ID ${id} not found`);
    }
  }
}
