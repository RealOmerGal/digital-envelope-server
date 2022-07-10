import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(username);
    if (user) return user;
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '60s',
        },
      ),
    };
  }

  async signInWithGoogle(data) {
    if (!data.user) throw new BadRequestException();

    //Check if user already exists
    let user = await this.usersService.findById(data.user.id);
    if (user) return this.login(user);

    user = await this.usersService.findOneByEmail(data.user.email);
    if (user)
      throw new ForbiddenException(
        "User already exists, but Google account was not connected to user's account",
      );

    try {
      const newUser = new User();
      newUser.firstName = data.user.firstName;
      newUser.lastName = data.user.lastName;
      newUser.email = data.user.email;
      newUser.id = '' + data.user.id;
      await this.usersService.create(newUser);
      return this.login(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }
}
