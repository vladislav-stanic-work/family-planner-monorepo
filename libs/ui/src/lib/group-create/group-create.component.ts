import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'fpl-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit {
  createGroupForm!: FormGroup;
  createDisabled = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<GroupCreateComponent> // @Inject(MAT_DIALOG_DATA) // public data: { //   admin: string; // }
  ) {}

  ngOnInit(): void {
    this.createGroupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: [''],
      members: [''],
    });

    this.createGroupForm?.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      this.updateStatus();
      this.cdr.detectChanges();
    });
  }

  updateStatus(): void {
    this.createDisabled = !this.createGroupForm.valid;
  }
}
