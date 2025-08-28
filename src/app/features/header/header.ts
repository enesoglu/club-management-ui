import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  imports: [Toolbar, Button],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

}
