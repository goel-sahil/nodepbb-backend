import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsActiveException extends HttpException {
  constructor() {
    super('User is already active!', HttpStatus.BAD_REQUEST);
  }
}
