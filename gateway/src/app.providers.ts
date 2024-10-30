import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwksAuthGuard, RolesGuard } from 'src/auth/guards';

import { BigIntScalar, ISODateTimeScalar } from './graphql/scalars';

export const appProviders: Array<Provider> = [
  BigIntScalar,
  ISODateTimeScalar,
  {
    provide: APP_GUARD,
    useClass: JwksAuthGuard,
  },

  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
];
