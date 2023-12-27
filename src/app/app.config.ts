import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firebaseProviders } from './firebase.config';
import { routes } from './app-routing';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const NO_NG_MODULES = importProvidersFrom([BrowserAnimationsModule]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    firebaseProviders,
    NO_NG_MODULES,
    {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: {
            appearance: 'outline',
            color: 'accent',
        },
    },
    provideAnimations()
],
};
