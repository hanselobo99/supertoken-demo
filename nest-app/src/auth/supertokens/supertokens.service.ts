import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: 'https://dev-39c49a31cc7111eda3863d121ac59361-us-east-1.aws.supertokens.io:3567',
        apiKey: 'eFxw6DFNlgqVnvC8Zn28u2QFqfTHD6',
      },
      recipeList: [EmailPassword.init(), Session.init()],
    });
  }
}
