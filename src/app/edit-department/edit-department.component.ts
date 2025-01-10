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
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css',
})
export class EditDepartmentComponent {
  readonly dialogRef = inject(MatDialogRef<EditDepartmentComponent>);
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
