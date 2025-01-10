import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-work',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './edit-work.component.html',
  styleUrl: './edit-work.component.css',
})
export class EditWorkComponent {
  readonly dialogRef = inject(MatDialogRef<EditWorkComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  name = this.data.element.name;
  edit() {
    console.log(this.name);
    this.dialogRef.close(this.name);
  }
  isInputValid() {
    return this.name.trim() !== '';
  }
}
