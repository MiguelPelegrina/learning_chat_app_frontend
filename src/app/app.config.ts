import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { splitLink } from '../../apollo.config';
import { routes } from './app.routes';
import { dbConfig } from './core/database/database-config';
import { icons } from './core/shared/ng-zorro.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      NgxIndexedDBModule.forRoot(dbConfig),
      NzIconModule.forRoot(icons),
    ]),
    provideApollo(() => {
      return {
        link: splitLink,
        cache: new InMemoryCache(),
      };
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
