import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClubMember, MemberRole, MembershipStatus } from '../../core/models/club-member.model';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
  ]
})
export class EditDialogComponent {
  @Input() visible: boolean = false;
  @Input() member: ClubMember | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() memberSaved = new EventEmitter<ClubMember>();

  clubRoles = Object.values(MemberRole);
  memberStatus = Object.values(MembershipStatus);

  save() {
    if (this.member) {
      this.memberSaved.emit(this.member);
    }
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
