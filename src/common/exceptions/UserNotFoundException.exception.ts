import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User does not exists!', HttpStatus.BAD_REQUEST);
  }
}
