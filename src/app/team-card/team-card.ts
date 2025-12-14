import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { StealEnum, Team } from '../app';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './team-card.html',
  styleUrl: './team-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCard {
  @Input({ required: true }) team!: Team;
  @Input({ required: true }) allTeams!: Team[];

  @Output() addScore = new EventEmitter<number>();
  @Output() half = new EventEmitter<void>();
  @Output() steal = new EventEmitter<{ targetTeam: Team, stealEnum: StealEnum }>();

  selectedTeam!: Team | null;
  selectedStealEnum!: StealEnum | null;
  protected readonly StealEnum = StealEnum;

  stealAction() {
    if (!this.selectedTeam || !this.selectedStealEnum)
      return;

    this.steal.emit({
      targetTeam: this.selectedTeam,
      stealEnum: this.selectedStealEnum
    });
    this.selectedTeam = null;
    this.selectedStealEnum = null;
  }
}
