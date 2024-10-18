import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth') // Define API categories
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '註冊新用戶' })
  @ApiResponse({ status: 201, description: '註冊成功' })
  @ApiResponse({ status: 400, description: '註冊失敗' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '用戶登入' })
  @ApiResponse({ status: 200, description: '登入成功' })
  @ApiResponse({ status: 401, description: '登入失敗' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('logout')
  @ApiOperation({ summary: '用戶登出' })
  @ApiResponse({ status: 200, description: '登出成功' })
  logout() {
    return this.authService.logout();
  }
}
