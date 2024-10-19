import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}  // Inject PrismaService

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password } = createUserDto;

    // Encrypted password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user information to database
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,  // Save encrypted password
      },
    });

    return { message: '註冊成功', user };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // Login logic, generate JWT token
    return { token: 'JWT Token', user: { id: 1, username: 'example', email: 'example@example.com' } };
  }

  async logout(): Promise<any> {
    // Logout logic
    return { message: '登出成功' };
  }
}
