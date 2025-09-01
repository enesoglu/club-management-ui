import { Routes } from '@angular/router';

import { MemberListComponent } from './features/member-list/member-list.component';
import { LoginComponent } from './features/login/login.component';

import { authGuard } from './core/guards/auth-guard';
import { loginGuard } from './core/guards/login-guard';
import { MemberDetailComponent } from './features/member-detail/member-detail.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },

  {
    path: 'members',
    component: MemberListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'members/:id',
    component: MemberDetailComponent,
    canActivate: [authGuard]
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: '/members'
  }

];
