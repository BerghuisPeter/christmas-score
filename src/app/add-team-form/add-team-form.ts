import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-add-team-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './add-team-form.html',
  styleUrl: './add-team-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTeamFormComponent {

  @Input({ required: true }) form!: FormGroup;

  @Output() add = new EventEmitter<void>();

  onSubmit() {
    if (this.form.valid) {
      this.add.emit();
    }
  }
}
