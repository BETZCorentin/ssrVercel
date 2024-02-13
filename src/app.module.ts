import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { envFilePath } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    UsersModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
