import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { OrganisationModule } from './organisation/organisation.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    OrganisationModule,
    ConfigModule.forRoot({envFilePath: ['.env'],}),
    MongooseModule.forRoot('mongodb://localhost/cc'),
  ],
})
export class AppModule {}
