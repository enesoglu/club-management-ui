import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MemberService} from '../../core/services/member.service';
import {PositionService} from '../../core/services/position.service';
import {ClubMember, MembershipStatus, YearOfStudy} from '../../core/models/club-member.model';
import {Team} from '../../core/models/position.model';
import {Position} from '../../core/models/position.model';
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
    }
  }

  @Input() visible: boolean = false;
  @Input() member: ClubMember | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() memberSaved = new EventEmitter<ClubMember>();

  clubTeams = Object.keys(Team);
  yearsOfStudy = Object.keys(YearOfStudy);
  memberStatus = Object.values(MembershipStatus);

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

    const roleChanged = this.originalTeam !== this.selectedTeam;

    if (roleChanged && this.selectedTeam) {
      // if position (role) is changed, update position
      const newPosition = { team: this.selectedTeam };
      positionUpdate$ = this.positionService.addPositionToMember(this.member.id, newPosition);
    }

    // İki isteği de (üye bilgileri ve pozisyon) aynı anda çalıştır
    forkJoin([memberInfoUpdate$, positionUpdate$]).subscribe({
      next: ([updatedMember, updatedPosition]) => {
        // Her iki işlem de bittiğinde
        console.log('Member details updated:', updatedMember);
        if (updatedPosition) {
          console.log('Member position updated:', updatedPosition);
        }
        // Diyalogu kapat ve listeyi yenilemek için sinyal gönder
        this.memberSaved.emit(this.member!); // updatedMember'ı da gönderebilirsiniz
      },
      error: (err) => console.error('Error while saving member details or position', err)
    });
  }

  /*save() {
    if (this.member) {
      // find the active position
      const activePosition = this.memberService.findActivePosition(this.member);

      // if member has a active position and a new position has been selected
      if (activePosition && this.selectedTeam) {
        // update the member's position
        activePosition.team = this.selectedTeam;
        if (activePosition.team == Team.EXECUTIVE) {
          activePosition.executiveTitle =
        }
      }
      // emit the updated member
      this.memberSaved.emit(this.member);
    }
  }*/



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
