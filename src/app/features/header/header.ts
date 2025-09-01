import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import { ClubMember } from '../../core/models/club-member.model';
import { MemberService } from '../../core/services/member.service';
import {Menu} from 'primeng/menu';
import {Team} from '../../core/models/position.model';

@Component({
  selector: 'app-header',
  imports: [Toolbar, Button, Menu],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  private memberService = inject(MemberService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser: ClubMember | null = null;
  items: MenuItem[] = []

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;

      // if currentUser is not null, menu has 'My Profile' and 'Logout' buttons.
      if (user) {
        this.items = [
          {
            label: "My Profile",
            icon: 'pi pi-user',
            routerLink: ['/members/' + user.id]
          },
          {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => this.logout()
          }
        ];

        // if user has "EXECUTIVE" role, also add "Admin Dashboard" to the menu
        let activePosition = this.memberService.findActivePosition(user);

        if (activePosition) {
          let userTeam: Team = activePosition.team;
          if (userTeam === Team.EXECUTIVE){
            this.items.splice(1, 0,
              {
              label: "Admin Dashboard",
              icon: "pi pi-microchip",
              routerLink: ['/admin-dashboard']
              }
            )
          }
        }

      }
      else {
        // if user logged out, clean variables.
        this.currentUser = null;
        this.items = [];
      }
    })
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

}
