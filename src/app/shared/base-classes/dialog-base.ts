import { Component } from '@angular/core';
import { CrewCommittee, ExecutiveTitle, Position, Team } from '../../core/models/position.model';

@Component({
  template: ''
})
export abstract class DialogBaseComponent {

  position: Position | null = null;
  selectedTeam: Team | undefined;
  showPositionDetail: "EXECUTIVE" | "CREW" | null = null;
  selectedPositionDetail: ExecutiveTitle | CrewCommittee | undefined;
  originalPositionDetail: ExecutiveTitle | CrewCommittee | undefined;

  updatePositionDetailsVisibility(activePosition: Position | null): void {

    if (this.selectedTeam === Team.EXECUTIVE) {
      this.showPositionDetail = "EXECUTIVE";
      this.selectedPositionDetail = activePosition?.executiveTitle;
      this.originalPositionDetail = this.selectedPositionDetail;
    } else if (this.selectedTeam === Team.CREW) {
      this.showPositionDetail = "CREW";
      this.selectedPositionDetail = activePosition?.crewCommittee;
      this.originalPositionDetail = this.selectedPositionDetail;
    } else {
      this.showPositionDetail = null;
      this.selectedPositionDetail = undefined;
    }
  }
}
