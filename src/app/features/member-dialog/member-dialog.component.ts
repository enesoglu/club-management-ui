import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClubMember, MembershipStatus, YearOfStudy } from '../../core/models/club-member.model';
import { Position, Team, CrewCommittee, ExecutiveTitle } from '../../core/models/position.model';
import { faculty_list, department_list } from '../../core/data/ankara-university-data';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AutoComplete } from 'primeng/autocomplete';
import {MemberService} from '../../core/services/member.service';

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
  ],
})
export class MemberDialogComponent implements OnChanges {

  constructor(private memberService: MemberService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'] && this.member) {
      this.selectedTeam = this.memberService.getActivePosition(this.member);
    }
  }

  @Input() visible: boolean = false;
  @Input() member: ClubMember | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() memberSaved = new EventEmitter<ClubMember>();

  teams = Object.values(Team);
  years = Object.values(YearOfStudy);
  memberStatus = Object.values(MembershipStatus);
  filteredItems: any[] = [];
  selectedTeam: Team | undefined

  save() {
    if (this.member) {
      // find the active position
      const activePosition = this.memberService.findActivePosition(this.member);

      // if member has a active position and a new position has been selected
      if (activePosition && this.selectedTeam) {
        // update the member's position
        activePosition.team = this.selectedTeam;
      }
      // emit the updated member
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

  protected readonly YearOfStudy = YearOfStudy;
  protected readonly Team = Team;
}
