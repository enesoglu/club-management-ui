import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MemberService} from '../../core/services/member.service';
import {ClubMember} from '../../core/models/club-member.model';
import {InputText} from 'primeng/inputtext';
import {Header} from '../header/header';
import {ActivatedRoute} from '@angular/router';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Tooltip} from 'primeng/tooltip';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {PositionService} from '../../core/services/position.service';
import {Position} from '../../core/models/position.model';
import {Button} from 'primeng/button';
import {PositionDialogComponent} from '../position-dialog/position-dialog.component';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-member-detail',
  imports: [
    InputText, ReactiveFormsModule, Header,
    FormsModule, Tabs, TabList,
    Tab, TabPanels, TabPanel,
    Tooltip, Card, TableModule, Button, PositionDialogComponent
  ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  private route = inject(ActivatedRoute)
  protected positionService = inject(PositionService);
  protected memberService = inject(MemberService);

  displayDialog: boolean = false;
  selectedPosition: Position | null = null;

  ngOnInit(): void {

    // get member id from URL
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(params => {
        const idParam = params.get('id');

      // if id is valid
      if (idParam) {
        const memberId = Number(idParam);

        // then get member
        this.getMember(memberId);

        // and get member's positions
        this.loadPositions(memberId)
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  member: ClubMember | null = null;
  positions: Position[] = [];


  /*   ---  methods  ---   */

  loadPositions(memberId: number): void {
    this.positionService.getPositions(memberId).subscribe({
      next: (data) => {
        data.sort((a, b) => b.id - a.id);
        this.positions = data;
      },
      error: (err) => {
        console.error("no position", err);
      }

    })
  }

  getMember(memberId: number): void {
    this.memberService.getMemberById(memberId).subscribe({
      next: (data) => {
        this.member = data;
      },
      error: (err) => {
        console.error("no member by id: ", memberId ,err);
      }
    });
  }

  deletePosition(positionId: number): void {
    if (!positionId) return;
    if (confirm("Selected position will be deleted. Are you sure?")) {
      this.positionService.deletePosition(positionId).subscribe({
        next: () => {
          console.log('Deleted: ' + positionId);
          this.loadPositions(<number>this.member?.id)
        },
        error: (err) => console.error('error occured while deleting position', err)
      });
    }
  }

  onPositionSave(updatedPosition: Position) {
    this.positionService.updatePosition(updatedPosition.id, updatedPosition).subscribe({
      next: () => {
        console.log('Updated: ' + updatedPosition.id);
        this.loadPositions(<number>this.member?.id)
        this.displayDialog = false;
        this.selectedPosition = null;
      },
      error: (err) => console.error('error occured', err)
    });
  }

  // dialog for editing position
  openPositionDialog(position: Position): void {
    this.selectedPosition = {...position};
    this.displayDialog = true;
  }

  // dialog for new position
  openNewPositionDialog(): void {
    this.selectedPosition = {} as Position
    this.displayDialog = true;
  }

  save() {
    if (this.isFormInvalid() || !this.member) {
      console.error('Member data is invalid or null.');
      return;
    }

    this.memberService.saveMember(this.member).subscribe({
      next: (updatedMember) => {
        this.member = updatedMember;
        console.log('Password updated successfully for member:', this.member?.id);
      },
      error: (err) => {
        console.error('Error occurred while updating password', err);
      }
    });
  }

  isFormInvalid(): boolean {
    return !this.member || !this.member.password || this.member.password.trim() === '';
  }
}
