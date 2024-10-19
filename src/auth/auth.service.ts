import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  // Import JWT service

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,  // Inject PrismaService
    private jwtService: JwtService,  // Inject JwtService
  ) {}

  // Registration function
  async register(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password } = createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user information to the database
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,  // Save the hashed password
      },
    });

    return { message: 'Registration successful', user };
  }

  // Login function
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;

    // Find the user in the database
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    // Validate the password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate JWT token
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } };
  }

  // Logout function
  async logout(): Promise<any> {
    // Logout logic (if session or token handling is needed, it can be done here)
    return { message: 'Logout successful' };
  }
}
