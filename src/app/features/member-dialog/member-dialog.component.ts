import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClubMember, MemberRole, MembershipStatus } from '../../core/models/club-member.model';
import {faculty_list, department_list, year_of_study} from '../../core/data/ankara-university-data';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-member-dialog',
  templateUrl: 'member-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    AutoComplete,
  ]
})
export class MemberDialogComponent {
  @Input() visible: boolean = false;
  @Input() member: ClubMember | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() memberSaved = new EventEmitter<ClubMember>();

  clubRoles = Object.values(MemberRole);
  memberStatus = Object.values(MembershipStatus);
  filteredItems: any[] = [];

  save() {
    if (this.member) {
      this.memberSaved.emit(this.member);
    }
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  searchDepartment(event: any) {
    const query = event.query.toLowerCase();

    this.filteredItems = department_list.filter(department => {
      return department.toLowerCase().includes(query);
    });
  }

  searchFaculty(event: any) {
    const query = event.query.toLowerCase();

    this.filteredItems = faculty_list.filter(department => {
      return department.toLowerCase().includes(query);
    });
  }

  protected readonly year_of_study = year_of_study;

  isNewMember: boolean = false;
  editInfoText: string = "Update the information of ";
  deleteInfoText: string = "Delete the member {{ member?.firstName }}";
  newInfoText: string = "Creating a new member";
}
