import { MemberService } from '../../core/services/member.service';
import { ClubMember, MemberRole, MembershipStatus } from '../../core/models/club-member.model';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-member-list',
  templateUrl: 'member-list.component.html',
  styleUrls: ['member-list.component.css'],
  standalone: true,
  imports: [FormsModule, TableModule, CommonModule, ButtonModule, Tooltip],
  providers: [MemberService]
})
export class MemberListComponent {

  memberStatus = Object.values(MembershipStatus);
  clubRoles = Object.values(MemberRole);
  members: ClubMember[] = [];                                 // full member list
  selectedMember: ClubMember | null = null;
  displayDialog: boolean = false;

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

  openEditDialog(member: ClubMember): void {
    this.selectedMember = { ...member };
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
    this.selectedMember = null;
  }

  expelMember(): void {
    if (!this.selectedMember) return;
    if (confirm(`'${this.selectedMember.firstName}' will be expelled. Are you sure?`)) {
      this.memberService.deleteMember(this.selectedMember.id).subscribe();
      console.log('Expelled:', this.selectedMember.id);
      this.hideDialog();
    }
  }




  //  -------------------------------------------
  //  Paginator methods

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event:any ) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.members ? this.first + this.rows >= this.members.length : true;
  }

  isFirstPage(): boolean {
    return this.members ? this.first === 0 : true;
  }


  protected readonly EditDialogComponent = EditDialogComponent;
}
