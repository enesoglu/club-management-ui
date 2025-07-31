import { ClubMember, MemberRole, MembershipStatus } from '../../core/models/club-member.model';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { MemberService } from '../../core/services/member.service';
import { MemberListComponent } from '../member-list.v0.2/member-list.component';
import {Dialog} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: 'edit-dialog.component.html',
  styleUrls: ['edit-dialog.component.css'],
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule, FormsModule, TableModule, CommonModule, ButtonModule],
  providers: [MemberService]
})
export class EditDialogComponent {
  @Input() visible: boolean = false;
  @Input() member: ClubMember | null = null;

  @Output() dialogClosed = new EventEmitter<void>();

  showDialog() {
    // @ts-ignore
    this.dialogClosed.emit(this.member);
  }



}



