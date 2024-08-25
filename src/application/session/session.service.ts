import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Session from 'src/common/models/Session.model';
import User from 'src/common/models/User.model';
import { CreateSessionDto } from './dto/create_session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session)
    private readonly sessionModel: typeof Session,
  ) {}

  /**
   * Creates or updates a session record and updates the user details if a user is logged in.
   * @param body - The session data from the request body.
   * @param ip - The IP address of the user.
   * @param user - The user object or null if the user is not logged in.
   * @returns A response object indicating success.
   */
  async createOrUpdateSession(
    body: CreateSessionDto,
    ip: string,
    user: User | null,
  ) {
    const now = new Date();
    const sessionData = {
      ip,
      user_agent: body.user_agent,
      route: body.route,
      last_active: now,
      user_id: user ? user.id : null,
    };

    // Create or update the session record
    await this.sessionModel.upsert(sessionData);

    if (user) {
      // Update the user details if a user is logged in
      user.last_ip = ip;
      user.last_active = now;
      await user.save();
    }
  }
}
