import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports:[UsersModule],
    controllers: [RegistrationController],
    providers: [RegistrationService],
})
export class RegistrationModule {}
