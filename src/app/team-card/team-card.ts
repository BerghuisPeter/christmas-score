import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../app';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    NgClass
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
  @Output() steal = new EventEmitter<number>(); // target team ID
}
