import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserUpdate } from '@family-planner/utils';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'fpl-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() name = '';
  @Input() description = '';
  @Output()
  updateUser: EventEmitter<IUserUpdate> = new EventEmitter<IUserUpdate>();

  updateUserForm!: FormGroup;
  updateDisabled = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      name: [this.name, [Validators.required, Validators.minLength(4)]],
      description: [this.description],
    });

    this.updateUserForm?.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      this.updateStatus();
      this.cdr.detectChanges();
    });
  }

  updateStatus(): void {
    this.updateDisabled =
      !this.updateUserForm.valid ||
      (this.name === this.updateUserForm.value.name &&
        this.description === this.updateUserForm.value.description);
  }

  // !updateUserForm.valid

  onSubmit(): void {
    const updateUser: { [key: string]: string } = {};

    if (this.name !== this.updateUserForm.value.name) {
      updateUser['name'] = this.updateUserForm.value.name;
    }

    if (this.description !== this.updateUserForm.value.description) {
      updateUser['description'] = this.updateUserForm.value.description || '';
    }

    this.updateUser.emit(updateUser);
    this.updateDisabled = true;
  }
}
