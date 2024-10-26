import { RegisterDto } from '@/modules/auth/dto/register-auth.dto';
import { PickType } from '@nestjs/swagger';

export class RegisterEmailUserDto extends PickType(RegisterDto, ['email']) {}
