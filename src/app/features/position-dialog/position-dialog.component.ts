import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {PositionService} from '../../core/services/position.service';
import {CrewCommittee, ExecutiveTitle, Position, Team} from '../../core/models/position.model';
import {Term} from '../../core/models/term.model';

import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SelectModule} from 'primeng/select';
import {TermService} from '../../core/services/term.service';
import {DialogBaseComponent} from '../../shared/base-classes/dialog-base';

@Component({
  selector: 'app-position-dialog',
  templateUrl: 'position-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DialogModule,
    ButtonModule, InputTextModule, SelectModule,
  ],
})
export class PositionDialogComponent extends DialogBaseComponent implements OnChanges, OnInit {

  constructor(private positionService: PositionService,
              private termService: TermService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position'] && this.position) {
      this.selectedTeam = this.position.team;
      this.originalTeam = this.selectedTeam;

      this.selectedTerm = this.position.term;
      this.originalTerm = this.position.term;
      this.updatePositionDetailsVisibility(this.position);
    }
  }

  ngOnInit() {
    this.loadTerms()
  }

  @Input() visible: boolean = false;
  @Input() declare position: Position | null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() positionSaved = new EventEmitter<Position>();

  terms: Term[] = [];
  clubTeams = Object.keys(Team);
  executiveTitles = Object.keys(ExecutiveTitle);
  crewCommittees = Object.keys(CrewCommittee);
  declare showPositionDetail: "EXECUTIVE" | "CREW" | null;
  declare selectedPositionDetail: ExecutiveTitle | CrewCommittee | undefined;
  declare originalPositionDetail: ExecutiveTitle | CrewCommittee | undefined;

  declare selectedTeam: Team | undefined
  declare selectedTerm: Term | undefined
  declare originalTerm: Term | undefined
  declare originalTeam: Team | undefined

  save() {
    if (!this.position || !this.position.id) {
      if (this.selectedTeam && this.selectedTerm) {
        const newPosition: Partial<Position> = {
          team: this.selectedTeam,
          term: this.selectedTerm,
        };

        if (this.selectedTeam === Team.EXECUTIVE) {
          newPosition.executiveTitle = this.selectedPositionDetail as ExecutiveTitle;
        } else if (this.selectedTeam === Team.CREW) {
          newPosition.crewCommittee = this.selectedPositionDetail as CrewCommittee;
        }
        this.positionSaved.emit(newPosition as Position);
      }
      return;
    }

    // if team or position detail(executiveTitle or crewCommittee) is changed
    const roleChanged = this.originalTeam !== this.selectedTeam || this.originalPositionDetail !== this.selectedPositionDetail;

    // if term has changed
    const termChanged = this.originalTerm?.id !== this.selectedTerm?.id;

    // then update position
    if (termChanged || roleChanged) {

      let positionToUpdate: Position = { ...this.position };

      if (roleChanged && this.selectedTeam) {
        positionToUpdate.team = this.selectedTeam;

        if (this.selectedTeam === Team.EXECUTIVE) {
          positionToUpdate.executiveTitle = this.selectedPositionDetail as ExecutiveTitle;
          positionToUpdate.crewCommittee = undefined;
        } else if (this.selectedTeam === Team.CREW) {
          positionToUpdate.crewCommittee = this.selectedPositionDetail as CrewCommittee;
          positionToUpdate.executiveTitle = undefined;
        } else {
          positionToUpdate.executiveTitle = undefined;
          positionToUpdate.crewCommittee = undefined;
        }
      }
      if (termChanged && this.selectedTerm) {
        positionToUpdate.term = this.selectedTerm;
      }

      this.positionService.updatePosition(positionToUpdate.id, positionToUpdate)
        .subscribe({
          next: () => {
            this.positionSaved.emit(positionToUpdate);
          },
          error: (err) => {
            console.error("Position could not be updated", err);
          }
        });
    }
  }

  cancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  get isFormInvalid(): boolean {
    // team and term must be selected
    if (!this.selectedTeam || !this.selectedTerm) {
      return true; // invalid
    }

    // if team is EXECUTIVE, ExecutiveTitle cannot be null.
    if (this.selectedTeam === Team.EXECUTIVE && !this.selectedPositionDetail) {
      return true; // invalid
    }

    // if team is CREW, CrewCommittee cannot be null
    if (this.selectedTeam === Team.CREW && !this.selectedPositionDetail) {
      return true; // invalid
    }

    return false; // if not, form is valid
  }

  loadTerms(): void {
    this.termService.getTerms().subscribe({
      next: (data) => {
        data.sort((a, b) => b.id - a.id);
        this.terms = data;
      },
      error: (err) => {
        console.error("no term", err);
      }

    })
  }
}
