import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { icons } from './core/shared/ng-zorro.module';
import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './core/database/database-config';
import { splitLink } from '../../apollo.config';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      [
        NgxIndexedDBModule.forRoot(dbConfig),
        NzIconModule.forRoot(icons)
      ]
    ),
    provideApollo(() => {
      return {
        link: splitLink,
        cache: new InMemoryCache(),
      };
    }),
    provideHttpClient(withInterceptorsFromDi()), provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
