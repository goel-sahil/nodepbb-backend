import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../../../common/auth/auth.service';
import User from 'src/common/models/User.model';

@Injectable()
export class LoginService {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login by validating credentials and generating a JWT token.
   * @param loginDto - The login data transfer object containing username and password.
   * @returns An object containing the user and JWT token if credentials are valid.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    // Validate user credentials
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    // Throw unauthorized exception if user is not found or password is incorrect
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid credentials provided',
      });
    }

    // Return user details and JWT token
    return {
      user,
      token: this.authService.generateToken(user),
    };
  }
}
