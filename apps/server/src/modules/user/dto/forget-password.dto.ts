import { RegisterDto } from '@/modules/auth/dto/register-auth.dto';
import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './update-user-password.dto';

export class ForgetPasswordDto extends IntersectionType(
  OmitType(UpdateUserPasswordDto, ['newPassword']),
  PickType(RegisterDto, ['email', 'code']),
) {}
