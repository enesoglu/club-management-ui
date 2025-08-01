import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import {aucsTheme} from './app.theme';

export let appConfig: ApplicationConfig;

appConfig = {
  providers: [
    provideAnimationsAsync(),

    providePrimeNG({
      theme: {
        preset: aucsTheme,
        /*options: {
          darkModeSelector: 'light',
        }*/
      }
    }),

    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
  ]
};
