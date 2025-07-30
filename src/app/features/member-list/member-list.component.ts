import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MemberService } from '../../core/services/member.service';
import {ClubMember, MemberRole, MembershipStatus} from '../../core/models/club-member.model';

@Component({
  selector: 'app-member-list',
  templateUrl: 'member-list.component.html',
  styleUrls: ['member-list.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  providers: [MemberService]
})
export class MemberListComponent {

  memberStatus = Object.values(MembershipStatus);
  clubRoles = Object.values(MemberRole);         // for .html dropdown
  members: ClubMember[] = [];                                 // full member list
  filteredMembers: ClubMember[] = [];                         // members filtered during the search
  selectedMember: ClubMember | null = null;                   // "selectedMember variable" could be null or one member (object)
  displayDialog: boolean = false;                             // is the edit windows open

  constructor(private memberService: MemberService) {}        // runs memberService
  first = 0;

  rows = 10;

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data: ClubMember[]) => {
        data.sort((a, b) => a.firstName.localeCompare(b.firstName))   //sorts by first name
        this.members = data;
      },
      error: (error: any) => {
        console.error('error occured', error);
      }
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  // @ts-ignore
  pageChange(event ) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.members ? this.first + this.rows >= this.members.length : true;
  }

  isFirstPage(): boolean {
    return this.members ? this.first === 0 : true;
  }
}
