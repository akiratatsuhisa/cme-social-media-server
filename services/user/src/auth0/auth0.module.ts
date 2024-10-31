import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';

import { MANAGEMENT } from './constants';

const managementProvider: Provider = {
  provide: MANAGEMENT,
  useFactory: (configService: ConfigService) => {
    const management = new ManagementClient({
      domain: configService.get<string>('OAUTH_DOMAIN').replace('https://', ''),
      clientId: configService.get<string>('AUTH0_MANAGEMENT_CLIENT_ID'),
      clientSecret: configService.get<string>('AUTH0_MANAGEMENT_CLIENT_SECRET'),
    });

    return management;
  },
  inject: [ConfigService],
};

@Global()
@Module({
  providers: [managementProvider],
  exports: [managementProvider],
})
export class Auth0Module {}
