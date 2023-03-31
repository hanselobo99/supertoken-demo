import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { URL } from './common/DBUrl';



@Module({
  imports: [
    MongooseModule.forRoot(URL),
    AuthModule.forRoot({
      connectionURI: 'https://try.supertokens.com',
      appInfo: {
        appName: 'test-app',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:3001',
        apiBasePath: '/auth',
        websiteBasePath: '/login',
      },
    }),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
