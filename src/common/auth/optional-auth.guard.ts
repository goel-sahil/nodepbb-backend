import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // If no authorization header is present, allow access
    if (!authHeader) {
      return true;
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = this.authService.verifyToken(token);

      // Fetch the user associated with the token
      const user = await this.authService.findById(decoded.id);

      if (user) {
        // Attach user to request if valid
        request.user = user;
        return true;
      } else {
        // If no user is found, the token is invalid
        throw new UnauthorizedException();
      }
    } catch (error) {
      // If token is invalid or expired, throw UnauthorizedException
      throw new UnauthorizedException();
    }
  }
}
