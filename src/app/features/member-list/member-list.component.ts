import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClubMember, MemberRole } from '../../core/models/club-member.model';
import { MemberService } from '../../core/services/member.service';

@Component({
  selector: 'app-member-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  clubRoles = Object.values(MemberRole);         // for .html dropdown
  members: ClubMember[] = [];                                 // full member list
  filteredMembers: ClubMember[] = [];                         // members filtered during the search
  selectedMember: ClubMember | null = null;                   // "selectedMember variable" could be null or one member (object)
  displayDialog: boolean = false;                             // is the edit windows open

  constructor(private memberService: MemberService) {}        // runs memberService

  // get members with memberService
  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data: ClubMember[]) => {
        this.members = data;
        this.filteredMembers = data;
      },
      error: (error: any) => {
        console.error('error occured', error);
      }
    });
  }

  // member search (filter)
  onFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if (!searchTerm) {
      this.filteredMembers = this.members;
      return;
    }
    this.filteredMembers = this.members.filter(member =>
      String(member.memberNo).includes(searchTerm) ||
      (member.firstName + ' ' + member.lastName).toLowerCase().includes(searchTerm) ||
      member.phoneNumber?.toLowerCase().includes(searchTerm)
    );
  }

  // .html:28
  openEditDialog(member: ClubMember): void {
    this.selectedMember = { ...member };
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
    this.selectedMember = null;
  }

  saveMember(): void {
    if (!this.selectedMember) return;
    // TODO: memberService.updateMember(this.selectedMember) çağrılacak
    console.log('Saving:', this.selectedMember);
    this.hideDialog();
  }

  expelMember(): void {
    if (!this.selectedMember) return;
    if (confirm(`'${this.selectedMember.firstName}' will be expelled. Are you sure?`)) {
      // TODO: memberService.deleteMember(this.selectedMember.id) çağrılacak
      console.log('Expelled:', this.selectedMember.id);
      this.hideDialog();
    }
  }

  // graduateMember(): {}

}
