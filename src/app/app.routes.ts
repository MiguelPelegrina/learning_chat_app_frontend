import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/messages/components/message/message.component').then(m => m.MessagePageComponent)
  }
];
