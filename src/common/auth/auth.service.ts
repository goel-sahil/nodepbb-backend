import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import User from 'src/common/models/User.model';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Validates a user by checking if the username/email exists and the password matches.
   * @param usernameOrEmail - The username or email of the user.
   * @param password - The password provided for validation.
   * @returns The user if valid, otherwise null.
   */
  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<User | null> {
    // Fetch user by username or email
    const user = await this.findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return null;
    }

    // Verify the password
    const isPasswordValid = await this.verifyPassword(password, user.password);
    return isPasswordValid ? user : null;
  }

  /**
   * Finds a user by username or email.
   * @param usernameOrEmail - The username or email of the user.
   * @returns The user if found, otherwise null.
   */
  async findUserByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
  }

  /**
   * Compares a plain password with a hashed password.
   * @param plainPassword - The plain password to compare.
   * @param hashedPassword - The hashed password to compare against.
   * @returns True if passwords match, otherwise false.
   */
  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Hashes the user's password using bcrypt.
   * @param password - The plain text password.
   * @returns The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(
      this.configService.get<string>('HASH_SALT_ROUNDS'),
      10,
    );
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Generates a JWT token for the given user.
   * @param user - The user for whom the token is generated.
   * @returns The generated JWT token.
   */
  generateToken(user: User): string {
    const payload = { id: user.id };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  /**
   * Finds the user by id.
   * @param id
   * @returns
   */
  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
}
