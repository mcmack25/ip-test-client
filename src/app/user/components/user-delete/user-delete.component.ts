import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css'],
})
export class UserDeleteComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { id: number; userName: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
