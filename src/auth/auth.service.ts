import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  async register(createUserDto: CreateUserDto): Promise<any> {
    // 註冊邏輯
    return { message: '註冊成功' };
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    // 登入邏輯，生成 JWT token
    return { token: 'JWT Token', user: { id: 1, username: 'example', email: 'example@example.com' } };
  }

  async logout(): Promise<any> {
    // 登出邏輯
    return { message: '登出成功' };
  }
}
