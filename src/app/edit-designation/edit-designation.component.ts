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
  selector: 'app-edit-department',
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
  templateUrl: './edit-designation.component.html',
  styleUrl: './edit-designation.component.css',
})
export class EditDesignationComponent {
  readonly dialogRef = inject(MatDialogRef<EditDesignationComponent>);
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
