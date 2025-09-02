import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MemberService} from '../../core/services/member.service';
import {PositionService} from '../../core/services/position.service';
import {ClubMember, MembershipStatus, YearOfStudy} from '../../core/models/club-member.model';
import {CrewCommittee, ExecutiveTitle, Position, Team} from '../../core/models/position.model';
import {department_list, faculty_list} from '../../core/data/ankara-university-data';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {AutoComplete} from 'primeng/autocomplete';
import {forkJoin, Observable, of} from 'rxjs';

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

  constructor(private memberService: MemberService,
              private positionService: PositionService,) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'] && this.member) {
      this.selectedTeam = (this.memberService.getActivePositionTeam(this.member));
      this.originalTeam = this.selectedTeam;
      this.updatePositionDetailsVisibility();
    }
  }

  @Input() visible: boolean = false;
  @Input() member: ClubMember | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() memberSaved = new EventEmitter<ClubMember>();

  yearsOfStudy = Object.keys(YearOfStudy);
  memberStatus = Object.keys(MembershipStatus);
  clubTeams = Object.keys(Team);
  executiveTitles = Object.keys(ExecutiveTitle);
  crewCommittees = Object.keys(CrewCommittee);
  showPositionDetail: "EXECUTIVE" | "CREW" | null = null;
  selectedPositionDetail: ExecutiveTitle | CrewCommittee | undefined;
  originalPositionDetail: ExecutiveTitle | CrewCommittee | undefined;

  filteredItems: any[] = [];
  selectedTeam: Team | undefined
  originalTeam: Team | undefined

  save() {
    if (!this.member || !this.member.id) {
      // if there is no id, it's a new member
      if(this.member) this.memberSaved.emit(this.member);
      return;
    }

    const memberInfoUpdate$ = this.memberService.saveMember(this.member);
    let positionUpdate$: Observable<Position | null> = of(null);

    // if team or position detail(executiveTitle or crewCommittee) is changed
    const roleChanged = this.originalTeam !== this.selectedTeam || this.originalPositionDetail !== this.selectedPositionDetail;

    // if position (role) is changed, update position
    if (roleChanged && this.selectedTeam) {

      const newPosition: any = { team: this.selectedTeam };

      if (this.selectedTeam === Team.EXECUTIVE){
        newPosition.executiveTitle = this.selectedPositionDetail as ExecutiveTitle;
      } else if (this.selectedTeam === Team.CREW){
        newPosition.crewCommittee = this.selectedPositionDetail as CrewCommittee;
      }

      positionUpdate$ = this.positionService.addPositionToMember(this.member.id, newPosition);
    }

    forkJoin([memberInfoUpdate$, positionUpdate$]).subscribe({
      next: ([updatedMember, updatedPosition]) => {
        console.log('Member details updated:', updatedMember);
        if (updatedPosition) {
          console.log('Member position updated:', updatedPosition);
        }

        this.memberSaved.emit(this.member!);
      },
      error: (err) => console.error('Error while saving member details or position', err)
    });
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  updatePositionDetailsVisibility(): void {
    const activePosition = this.member ? this.memberService.findActivePosition(this.member) : undefined;

    if (this.selectedTeam === Team.EXECUTIVE){
      this.showPositionDetail = "EXECUTIVE";
      this.selectedPositionDetail = activePosition?.executiveTitle
      this.originalPositionDetail = this.selectedPositionDetail

    } else if (this.selectedTeam === Team.CREW){
      this.showPositionDetail = "CREW";
      this.selectedPositionDetail = activePosition?.crewCommittee
      this.originalPositionDetail = this.selectedPositionDetail

    } else {
      this.showPositionDetail = null;
      this.selectedPositionDetail = undefined;
    }
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
}
