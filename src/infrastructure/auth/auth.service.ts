import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const 
  }

  async register(registerDto: RegisterDto) {
    return 'Registered';
  }
}
