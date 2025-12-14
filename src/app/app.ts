import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTeamFormComponent } from './add-team-form/add-team-form';
import { TeamCard } from './team-card/team-card';

const christmasTeamNames = [
  "Snowflakes",
  "Jolly Elves",
  "Candy Canes",
  "Gingerbread Crew",
  "Snowball Squad",
  "Santa Helpers",
  "Reindeer Team",
  "Snowy Stars",
  "Merry Makers",
  "Holly Berries",
  "Christmas Lights",
  "Santa’s Sleigh Team",
  "Frosty Friends",
  "Tinsel Team",
  "Winter Wolves",
  "North Pole Explorers",
  "Happy Snowmen",
  "Cocoa Crew",
  "Gift Wrappers",
  "Star Shiners"
];

export enum StealEnum {
  MINUS_FIVE = "MINUS_FIVE",
  HALF = "HALF",
}

export type Team = {
  id: number;
  name: string;
  score: WritableSignal<number>;
};

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    AddTeamFormComponent,
    TeamCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  teams = signal<Team[]>([]);
  remainingTeamNames = signal([...christmasTeamNames]);

  pickTeam = () => {
    const list = this.remainingTeamNames();
    if (!list.length) return null;

    const index = Math.floor(Math.random() * list.length);
    const team = list[index];

    // update state
    this.remainingTeamNames.update(old => {
      const copy = [...old];
      copy.splice(index, 1);
      return copy;
    });

    return team;
  };

  form = new FormGroup({
    team: new FormControl('', Validators.required)
  });

  constructor() {
    this.form.get('team')!.setValue(this.pickTeam());
  }

  addTeam() {
    const value = this.form.value.team?.trim();
    if (!value) return;

    this.teams.update(list => [...list,
      { id: this.teams().length + 1, name: value, score: signal(0) }
    ]);

    this.form.get('team')?.setValue(this.pickTeam());
  }

  addScore(team: Team, amount: number) {
    team.score.update(s => s + amount);
  }

  halfScore(team: Team) {
    team.score.update(s => Math.ceil(s / 2));
  }

  stealHalfScore(receivingTeam: Team, stealParams: { targetTeam: Team, stealEnum: StealEnum }) {
    switch (stealParams.stealEnum) {
      case StealEnum.HALF: {
        const half = Math.ceil(stealParams.targetTeam.score() / 2);
        receivingTeam.score.update(s => s + half);
        stealParams.targetTeam.score.update(s => this.subtractScore(s, half));
        break;
      }
      case StealEnum.MINUS_FIVE: {
        const amount = Math.min(stealParams.targetTeam.score(), 5);
        receivingTeam.score.update(s => s + amount);
        stealParams.targetTeam.score.update(s => this.subtractScore(s, 5));
        break;
      }
    }
  }

  private subtractScore(score: number, amount: number): number {
    return Math.max(0, score - amount);
  }

}
