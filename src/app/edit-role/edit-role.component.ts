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
import { EditDepartmentComponent } from '../edit-department/edit-department.component';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css',
})
export class EditRoleComponent {
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
