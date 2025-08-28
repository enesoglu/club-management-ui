import { Routes } from '@angular/router';
import { MemberListComponent } from './features/member-list/member-list.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'members',
    component: MemberListComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: '/members'
  }

];
