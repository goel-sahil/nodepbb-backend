import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserTitlesService } from './user-titles.service';
import { CreateUserTitleDto } from './dto/create-user-title.dto';
import { UpdateUserTitleDto } from './dto/update-user-title.dto';

@Controller('admin/user-titles')
export class UserTitlesController {
  constructor(private readonly userTitlesService: UserTitlesService) {}

  /**
   * Creates a new user title.
   * @param body - Data transfer object containing user title information.
   * @returns A message and the newly created user title.
   */
  @Post()
  async create(@Body() body: CreateUserTitleDto) {
    const userTitle = await this.userTitlesService.create(body);
    return {
      message: 'User title created successfully!',
      data: userTitle,
    };
  }

  /**
   * Retrieves all user titles.
   * @returns A message and an array of user titles.
   */
  @Get()
  async findAll() {
    const userTitles = await this.userTitlesService.findAll();
    return {
      message: 'User titles retrieved successfully!',
      data: userTitles,
    };
  }

  /**
   * Retrieves a specific user title by its ID.
   * @param id - The ID of the user title to retrieve.
   * @returns A message and the user title with the specified ID.
   * @throws NotFoundException if the user title is not found.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userTitle = await this.userTitlesService.findOne(+id);
    return {
      message: 'User title retrieved successfully!',
      data: userTitle,
    };
  }

  /**
   * Updates an existing user title by its ID.
   * @param id - The ID of the user title to update.
   * @param body - Data transfer object containing updated user title information.
   * @returns A message and the updated user title.
   * @throws NotFoundException if the user title is not found.
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserTitleDto) {
    const userTitle = await this.userTitlesService.update(+id, body);
    return {
      message: 'User title updated successfully!',
      data: userTitle,
    };
  }

  /**
   * Deletes a user title by its ID.
   * @param id - The ID of the user title to delete.
   * @returns A message indicating that the user title has been deleted.
   * @throws NotFoundException if the user title is not found.
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userTitlesService.remove(+id);
    return {
      message: 'User title deleted successfully!',
    };
  }
}
