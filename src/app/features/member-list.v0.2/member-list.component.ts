import { MemberService } from '../../core/services/member.service';
import { ClubMember, MemberRole, MembershipStatus } from '../../core/models/club-member.model';

import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Card } from 'primeng/card'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-member-list',
  templateUrl: 'member-list.component.html',
  styleUrls: ['member-list.component.css'],
  standalone: true,
  imports: [
    FormsModule, TableModule, CommonModule,
    ButtonModule, Tooltip, MemberDialogComponent,
    Card, IconField, InputIcon, InputText,
    MultiSelect,
  ],
  providers: [MemberService]
})
export class MemberListComponent implements OnInit {

  memberStatus = Object.values(MembershipStatus);
  clubRoles = Object.values(MemberRole);

  members: ClubMember[] = [];
  filteredMembers: ClubMember[] = [];
  selectedMember: ClubMember | null = null;
  displayDialog: boolean = false;

  // variables for filters
  selectedStatus: string[] = ['ACTIVE'];
  selectedRoles: MemberRole[] = [];
  searchTerm: string = ''
  roleOptions = this.clubRoles;
  statusOptions = [...this.memberStatus];

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data: ClubMember[]) => {
        data.sort((a, b) => a.firstName.localeCompare(b.firstName))   //sorts by first name
        this.members = data;
        this.applyFilters();
      },
      error: (error: any) => {
        console.error('error occured', error);
      }
    });
  }

  expelMember(member: ClubMember): void {
    if (!member) return;
    if (confirm(`'${member.firstName}' will be expelled. Are you sure?`)) {
      this.memberService.deleteMember(member.id).subscribe({
        next: () => {
          console.log('Deleted: '+ member.id);
          this.loadMembers()
        },
        error: (err) => console.error('error occured', err)
      });
    }
  }

  onMemberSave(updatedMember: ClubMember) {
    this.memberService.saveMember(updatedMember).subscribe({
      next: () => {
        console.log('Updated: '+ updatedMember.id);
        this.loadMembers()
        this.displayDialog = false;
      },
      error: (err) => console.error('error occured', err)
    });
  }

  openMemberDialog(member: ClubMember): void {
    this.selectedMember = {...member};
    this.displayDialog = true;
  }

  // filter methods
  applyFilters(): void {
    let result = this.members;

    // filter for status
    if (this.selectedStatus.length > 0 && !this.selectedStatus.includes('Tümü')) {
      result = result.filter(member => this.selectedStatus.includes(member.membershipStatus));
    }

    // filter for roles
    if (this.selectedRoles.length > 0) {
      result = result.filter(member => this.selectedRoles.includes(member.role));
    }

    // search bar
    if (this.searchTerm) {
      const lowerCaseSearch = this.searchTerm.toLowerCase();
      result = result.filter(member =>
        (member.firstName + " " + member.lastName).toLowerCase().includes(lowerCaseSearch) ||
        (member.email || '').toLowerCase().includes(lowerCaseSearch) ||
        (member.phoneNumber || '').toString().toLowerCase().includes(lowerCaseSearch) ||
        (member.memberNo || '').toString().toLowerCase().includes(lowerCaseSearch)
      );
    }

    // display the result
    this.filteredMembers = result;
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  //  Paginator methods
  first: number = 0;
  rows: number = 10;

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.filteredMembers ? this.first + this.rows >= this.filteredMembers.length : true;
  }

  isFirstPage(): boolean {
    return this.filteredMembers ? this.first === 0 : true;
  }
}
