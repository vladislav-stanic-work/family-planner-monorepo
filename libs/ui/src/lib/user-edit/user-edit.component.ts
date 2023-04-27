import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUserUpdate } from '@family-planner/utils';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'fpl-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() name = '';
  @Input() allGroups: {
    id: string;
    name: string;
    disabled: boolean;
    preselected: boolean;
  }[] = [];
  @Input() description = '';
  @Output()
  updateUser: EventEmitter<IUserUpdate> = new EventEmitter<IUserUpdate>();

  updateUserForm!: FormGroup;
  updateDisabled = true;

  preselectedItems: string[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get Preselected
    this.preselectedItems = this.allGroups
      .filter((it) => it.preselected)
      .map((that) => that.id);

    // Set Form
    this.updateUserForm = this.fb.group({
      name: [this.name, [Validators.required, Validators.minLength(4)]],
      groups: new FormControl(this.preselectedItems),
      description: [this.description],
    });

    // On Change
    this.updateUserForm?.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      this.updateStatus();
      this.cdr.detectChanges();
    });
  }

  updateStatus(): void {
    this.updateDisabled =
      !this.updateUserForm.valid ||
      (this.name === this.updateUserForm.value.name &&
        this.description === this.updateUserForm.value.description &&
        JSON.stringify(this.preselectedItems) ===
          JSON.stringify(this.updateUserForm.value.groups));
  }

  onSubmit(): void {
    const updateUser: { [key: string]: string[] } = {};

    if (this.name !== this.updateUserForm.value.name) {
      updateUser['name'] = this.updateUserForm.value.name;
    }

    if (this.description !== this.updateUserForm.value.description) {
      updateUser['description'] = this.updateUserForm.value.description || '';
    }

    if (
      JSON.stringify(this.preselectedItems) !==
      JSON.stringify(this.updateUserForm.value.groups)
    ) {
      updateUser['removedGroupIds'] = this.preselectedItems.filter(
        (member: string) => !this.updateUserForm.value.groups.includes(member)
      );
      updateUser['addedGroupIds'] = this.updateUserForm.value.groups.filter(
        (member: string) => !this.preselectedItems.includes(member)
      );
    }

    this.updateUser.emit(updateUser);
    this.updateDisabled = true;
  }
}
